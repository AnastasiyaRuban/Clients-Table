import { el } from 'redom';
import { createTable } from './createTable.js';
import { openPopup, closePopup } from './popup.js';
import './style/style.scss';
import { getIcon } from './svgIcons.js';

function createHeaderApp() {
  const headerBlock = document.createElement('header'),
    logo = getIcon('logo'),
    searchInput = document.createElement('input');

  searchInput.setAttribute('placeholder', 'Введите запрос');
  searchInput.classList.add('searchInput', 'input-reset');

  headerBlock.classList.add('header');
  headerBlock.innerHTML += logo;
  headerBlock.append(searchInput);

  return {
    headerBlock,
    searchInput,
  };
}

function createBodyApp() {
  const bodyApp = document.createElement('main'),
    title = createTitleApp(),
    table = createTable(),
    addClientButton = createAddClientButton();

  bodyApp.classList.add('clients', 'd-flex', 'flex-column');
  bodyApp.append(title, table.table, addClientButton);

  return {
    bodyApp,
    table,
    addClientButton,
  };
}

function createTitleApp() {
  const title = document.createElement('h1');

  title.textContent = 'Клиенты';
  title.classList.add('clients__title', 'mb-5');

  return title;
}

function createAddClientButton() {
  const button = document.createElement('button');

  button.classList.add('button-reset', 'btn', 'addClientButton');
  button.innerHTML += getIcon('user');
  button.innerHTML += `Добавить клиента`;

  button.addEventListener('click', () => {
    openPopup('addClient');
  });

  return button;
}

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

export function createContainer() {
  const header = createHeaderApp(),
    bodyApp = createBodyApp(),
    loader = createLoader(),
    popupError = createPopupError(),
    popupRemoveClient = createPopup('removeClient'),
    popupAddClient = createPopup('addClient'),
    popupUpdateClient = createPopup('updateClient'),
    container = el('div', { class: 'container' }, [
      header.headerBlock,
      bodyApp.bodyApp,
      loader,
      popupError,
      popupRemoveClient,
      popupAddClient,
      popupUpdateClient,
    ]);
  return {
    container,
    bodyApp,
    loader,
    popupError,
    popupRemoveClient,
    popupAddClient,
    popupUpdateClient,
  };
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

function createLoader() {
  const loader = document.createElement('div');
  loader.innerHTML = `
    <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
`;
  loader.classList.add(
    'loader',
    'justify-content-center',
    'align-items-center'
  );

  return loader;
}

function createPopupError() {
  const popup = createPopup('error');
  const popupContentBlock = document.createElement('div');
  const popupContent = document.createElement('p');
  const closeButton = document.createElement('button');

  closeButton.classList.add('popup__close-btn', 'button-reset');
  popupContentBlock.classList.add('popup__сontent');
  popupContent.classList.add('popup__text');

  closeButton.addEventListener('click', closePopup);

  popupContentBlock.append(popupContent, closeButton);
  popup.append(popupContentBlock);

  return popup;
}
function createPopup(type) {
  const popup = document.createElement('div');
  popup.classList.add(
    'popup',
    'd-flex',
    'justify-content-center',
    'align-items-center'
  );
  popup.dataset.type = type;

  return popup;
}
