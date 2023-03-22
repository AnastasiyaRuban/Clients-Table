import { el } from 'redom';
import { openPopup, closePopup } from './popup.js';
import { getIcon } from './svgIcons.js';
import { createSelect } from './createCustomSelect.js';

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
  const idClient = el('th', `${client.id}`),
    fullName = el('th', `${client.surname} ${client.name} ${client.lastName}`),
    createDate = el('th', getClientsDate(client.createdAt, 'create')),
    updateDate = el('th', getClientsDate(client.updatedAt, 'update')),
    contacts = el('th', contactsCell),
    buttons = el('th', { class: 'cell-actions' }, [
      actionButton.changeButton,
      actionButton.deleteButton,
    ]);

  return { idClient, fullName, createDate, updateDate, contacts, buttons };
}

function ctreateContactsCell(client) {
  const contacts = client.contacts;
  const type = {
    fb: 'Facebook',
    vk: 'Vkontakte',
    phone: 'Телефон',
    addPhone: 'Доп. телефон',
    twitter: 'Twitter',
    email: 'Email',
  };
  let cell = [];

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
  changeButton.innerHTML += 'Изменить';

  deleteButton.classList.add('action-button', 'button-reset', 'button-delete');
  deleteButton.innerHTML += cancelIcon;
  deleteButton.innerHTML += 'Удалить';

  changeButton.addEventListener('click', () => {
    openPopup('changeClient', client);
  });

  deleteButton.addEventListener('click', () => {
    openPopup('removeClient', client);
  });

  return {
    changeButton,
    deleteButton,
  };
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

  label.classList.add('form__label');
  label.setAttribute('for', field);

  inputBlock.classList.add('form__inputBlock');

  inputBlock.append(input, label);

  return { inputBlock, label, input };
}

export function createInputContact() {
  const select = createSelect();
  const contactField = document.createElement('div');
  const removeContactBtn = document.createElement('button');
  const removeIcon = getIcon('cancel');

  const input = document.createElement('input');

  input.setAttribute('type', 'text');
  input.classList.add('form-control', 'inputContact', 'input-reset');
  input.setAttribute('placeholder', 'Введите данные контакта');

  contactField.classList.add(
    'input-group',
    'input-reset',
    'inputContactsGroup',
    'mb-3'
  );
  removeContactBtn.innerHTML += removeIcon;

  removeContactBtn.classList.add('button-reset', 'removeContactBtn');
  contactField.append(select, input, removeContactBtn);

  removeContactBtn.addEventListener('click', () => {
    removeContactBtn.parentNode.remove();
  });

  return { contactField, select, input };
}

export function createContactsBlock({ contacts }) {
  const contactsBlock = document.createElement('div');

  contacts.forEach((contact) => {
    const inputContacts = createInputContact();
    const type = contact.type;
    const value = contact.value;

    switch (type) {
      case 'phone':
        inputContacts.select.value = 'phone';
        break;

      case 'addPhone':
        inputContacts.select.value = 'addPhone';
        break;

      case 'email':
        inputContacts.select.value = 'email';
        break;

      case 'vk':
        inputContacts.select.value = 'vk';
        break;

      case 'fb':
        inputContacts.select.value = 'fb';
        break;

      case 'twitter':
        inputContacts.select.value = 'twitter';
        break;
    }
    inputContacts.input.value = value;

    contactsBlock.append(inputContacts.contactField);
  });

  return contactsBlock;
}
