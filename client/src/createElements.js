import { el } from 'redom';
import { closePopup } from './popupActions.js';
import { getIcon } from './svgIcons.js';
import { createSelect } from './createCustomSelect.js';
import {
  openPopupRemoveClient,
  openPopupCreateClient,
} from './popupActions.js';
import { removeClient } from './actions.js';
import { getClient } from './api.js';

export let currentId = null;

export function createClientItem(client) {
  const cells = createClientCells(client);
  const rowTable = el('tr', [
    cells.idClient,
    cells.fullName,
    cells.createDate,
    cells.updateDate,
    cells.contacts,
    cells.buttons,
  ]);

  rowTable.dataset.id = client.id;
  rowTable.dataset.fullName = `${client.surname} ${client.name} ${client.lastName}`;
  rowTable.dataset.surname = client.surname;
  rowTable.dataset.updatedAt = client.updatedAt;
  rowTable.dataset.createdAt = client.createdAt;

  return rowTable;
}

export function createClientCells(client) {
  const actionButton = createActionButton(client);
  const contactsCell = ctreateContactsCell(client);
  const contactsBlock = document.createElement('div');

  contactsCell.forEach((btn) => contactsBlock.append(btn));
  const idClient = el('th', `${client.id}`),
    fullName = el('th', `${client.surname} ${client.name} ${client.lastName}`),
    createDate = el('th', getClientsDate(client.createdAt, 'create')),
    updateDate = el('th', getClientsDate(client.updatedAt, 'update')),
    contacts = el('th', contactsBlock),
    buttons = el(
      'th',

      el('div', { class: 'cell-actions' }, [
        actionButton.changeButton,
        actionButton.deleteButton,
      ])
    );

  contactsBlock.classList.add('table__contacts');

  return { idClient, fullName, createDate, updateDate, contacts, buttons };
}

function ctreateContactsCell(client) {
  const contacts = client.contacts;
  let amountContactButton = 0;
  const btnMore = document.createElement('button');

  const type = {
    fb: 'Facebook',
    vk: 'Vkontakte',
    phone: 'Телефон',
    addPhone: 'Доп. телефон',
    twitter: 'Twitter',
    email: 'Email',
  };
  let cell = [];

  btnMore.classList.add('button-reset', 'btnContactMore');
  btnMore.innerHTML = '+' + String(contacts.length - 4);

  btnMore.addEventListener('click', () => {
    const parent = btnMore.parentNode;
    const btnContacts = parent.querySelectorAll('.btn-tooltip');
    btnContacts.forEach((btn) => (btn.style.display = 'block'));
    btnMore.style.display = 'none';
  });

  if (contacts) {
    contacts.forEach((contact) => {
      const btn = document.createElement('button');
      let icon = '';
      const tooltip = document.createElement('div');
      if (
        contact.type == 'fb' ||
        contact.type == 'vk' ||
        contact.type == 'mail' ||
        contact.type == 'phone'
      ) {
        icon = getIcon(contact.type);
      } else {
        icon = getIcon('twitter');
      }

      btn.innerHTML += icon;
      btn.classList.add('btn-tooltip', 'button-reset');

      tooltip.classList.add('contact-tooltip');
      tooltip.innerHTML = `<span class="contact-type">${
        type[contact.type]
      }: </span><span class="contact-value">${contact.value}</span>`;
      btn.append(tooltip);

      cell.push(btn);
      amountContactButton++;
      if (amountContactButton == 4) {
        cell.push(btnMore);
      }
      if (amountContactButton > 4) {
        btn.style.display = 'none';
      }
    });
  }
  return cell;
}

function getDate(date) {
  const day = new Date(date).getDate().toString().padStart(2, '0');
  const month = (new Date(date).getMonth() + 1).toString().padStart(2, '0');
  const year = new Date(date).getFullYear().toString();

  const res = `${day}.${month}.${year}`;
  return res;
}
function getTime(date) {
  const hour = new Date(date).getHours().toString().padStart(2, '0');
  const minutes = new Date(date).getMinutes().toString().padStart(2, '0');

  const res = `${hour}:${minutes}`;
  return res;
}

function getClientsDate(date, action) {
  const dateBlock = el(
    'div',
    el('span', { class: `client__${action}-date` }, `${getDate(date)}`),
    el('span', { class: `client__${action}-time` }, `${getTime(date)}`)
  );

  return dateBlock;
}

function createActionButton(client) {
  const changeButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const editIcon = getIcon('edit');
  const cancelIcon = getIcon('cancel');

  changeButton.classList.add('action-button', 'button-reset', 'button-change');
  changeButton.innerHTML += editIcon;
  changeButton.innerHTML +=
    '<span class="spinner-border text-primary" role="status"></span>';
  changeButton.innerHTML += 'Изменить';
  changeButton.querySelector('span').style.display = 'none';

  deleteButton.classList.add('action-button', 'button-reset', 'button-delete');
  deleteButton.innerHTML += cancelIcon;
  deleteButton.innerHTML +=
    '<span class="spinner-border text-primary" role="status"></span>';
  deleteButton.innerHTML += 'Удалить';
  deleteButton.querySelector('span').style.display = 'none';

  changeButton.addEventListener('click', async function () {
    changeButton.querySelector('span').style.display = 'inline-block';
    changeButton.querySelector('svg').style.display = 'none';
    currentId = client.id;
    await rewriteForm(currentId);
    openPopupCreateClient();
    changeButton.querySelector('span').style.display = 'none';
    changeButton.querySelector('svg').style.display = 'block';
    const popup = document.querySelector('.popup.open');
    popup.dataset.type = 'changeClient';
    popup.dataset.clientId = currentId;
  });

  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteButton.querySelector('span').style.display = 'inline-block';
    deleteButton.querySelector('svg').style.display = 'none';
    setTimeout(() => {
      openPopupRemoveClient(client.id);
      deleteButton.querySelector('span').style.display = 'none';
      deleteButton.querySelector('svg').style.display = 'block';
    }, 300);
  });

  return {
    changeButton,
    deleteButton,
  };
}

export function deleteClient() {
  removeClient(currentId);
  closePopup();
}

export function createInputBlock(field) {
  const inputBlock = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('input');

  input.classList.add('form__input', 'input-reset');
  input.setAttribute('name', field);
  input.setAttribute('id', field);
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', ' ');

  input.addEventListener('input', () => {
    input.classList.remove('is-invalid');
    const error = document.querySelector(`[data-error-name=${field}]`);
    if (error) error.remove();
  });

  label.classList.add('form__label');
  label.setAttribute('for', field);

  inputBlock.classList.add('form__inputBlock');

  inputBlock.append(input, label);

  return { inputBlock, label, input };
}

export function createInputContact(contact = null) {
  const selectElements = createSelect(contact);
  const selectBlock = selectElements.selectBlock;
  const selectNative = selectElements.selectNative;
  const selectCustom = selectElements.selectCustom;
  const contactField = document.createElement('div');
  const removeContactBtn = document.createElement('button');
  const removeIcon = getIcon('cancel');
  const removeContactBtnPopupBlock = document.createElement('div');
  const removeContactBtnPopup = document.createElement('span');

  removeContactBtn.append(removeContactBtnPopupBlock);
  removeContactBtnPopupBlock.append(removeContactBtnPopup);
  removeContactBtnPopup.textContent = 'Удалить контакт';
  removeContactBtnPopupBlock.classList.add('contact-tooltip');
  removeContactBtnPopup.classList.add('removeBtnPopup');

  const input = document.createElement('input');

  input.setAttribute('type', 'text');
  input.classList.add('inputContact', 'input-reset');
  input.setAttribute('placeholder', 'Введите данные контакта');
  input.setAttribute('name', 'contacts');
  input.addEventListener('input', () => {
    input.classList.remove('is-invalid');
    const error = document.querySelector('[data-error-name="contacts"]');
    if (error) error.remove();
  });

  contactField.classList.add('input-reset', 'inputContactsGroup');
  removeContactBtn.innerHTML += removeIcon;

  removeContactBtn.classList.add(
    'button-reset',
    'removeContactBtn',
    'btn-tooltip'
  );
  contactField.append(selectBlock, input, removeContactBtn);

  removeContactBtn.addEventListener('click', () => {
    removeContactBtn.parentNode.remove();
  });

  return {
    contactField,
    selectBlock,
    selectNative,
    selectCustom,
    input,
    removeContactBtn,
  };
}

function createContactBlock(contact) {
  const inputContactElements = createInputContact(contact);
  const contactBlock = inputContactElements.contactField;
  const selectNative = inputContactElements.selectNative;
  const selectCustom = inputContactElements.selectCustom;
  const type = contact.type;
  const value = contact.value;

  switch (type) {
    case 'phone':
      selectNative.value = 'phone';
      break;

    case 'addPhone':
      selectNative.value = 'addPhone';
      break;

    case 'email':
      selectNative.value = 'email';
      break;

    case 'vk':
      selectNative.value = 'vk';
      break;

    case 'fb':
      selectNative.value = 'fb';
      break;

    case 'twitter':
      selectNative.value = 'twitter';
      break;
  }

  inputContactElements.input.value = value;

  return contactBlock;
}

async function rewriteForm(id) {
  const popupForm = document.querySelector('.form');
  const nameInput = popupForm.querySelector('[name="name"]');
  const surnameInput = popupForm.querySelector('[name="surname"]');
  const lastNameInput = popupForm.querySelector('[name="lastName"]');
  const contactsBlock = popupForm.querySelector('.contacts__inputs');
  const title = popupForm.querySelector('.title');
  const additionalBtn = popupForm.querySelector('.popup__additional-btn');
  const clientData = await getClient(id);
  nameInput.value = clientData.name;
  surnameInput.value = clientData.surname;
  lastNameInput.value = clientData.lastName;

  title.innerHTML = `Изменить данные <span>ID: ${clientData.id}</span> `;

  additionalBtn.innerHTML = 'Удалить клиента';
  additionalBtn.removeEventListener('click', closePopup);
  additionalBtn.addEventListener('click', deleteClient);

  clientData.contacts.forEach((contact) => {
    const contactBlock = createContactBlock(contact);
    contactsBlock.append(contactBlock);
  });

  const contactInputs = contactsBlock.querySelectorAll('.inputContactsGroup');
  contactsBlock.dataset.amountChild = contactInputs.length;
}
