import { el } from 'redom';
import { createTable } from './createTable.js';
import { openPopup } from './popup.js';
import './style/style.scss';

function createSvg(id, height, width) {
  const svg = document.createElement('svg');

  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.innerHTML = `<use xlink:href="#${id}"></use>`;

  return svg;
}

function createHeaderApp() {
  const headerBlock = document.createElement('header'),
    logo = createSvg('logo', 50, 50),
    searchInput = document.createElement('input');

  searchInput.setAttribute('placeholder', 'Введите запрос');
  searchInput.classList.add('searchInput', 'input-reset');

  headerBlock.classList.add('header');
  headerBlock.append(logo, searchInput);

  return {
    headerBlock,
    searchInput,
  };
}

function createBodyApp() {
  //возвращает bodyApp, table, addClientButton
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
  //return button;
  const button = document.createElement('button');

  button.classList.add('button-reset', 'btn', 'addClientButton');
  button.innerHTML = `Добавить клиента`;

  button.addEventListener('click', () => {
    const popup = openPopup('addClient');
    document.body.append(popup);
  });

  return button;
}

export function createClientItem(client) {
  const actionButton = createActionButton(client);

  const rowTable = el('tr', { id: client.id }, [
    el('th', `${client.id}`),
    el('th', `${client.name} ${client.patronymic} ${client.surname}`),
    el('th', `${client.date}`),
    el('th', `${client.dateChanging ? client.dateChanging : ''}`),
    el('th', `${client.contacts.phone}`),
    el('th', [actionButton.changeButton, actionButton.deleteButton]),
  ]);

  return rowTable;
}

export function createContainer() {
  //return { container, bodyApp }
  const header = createHeaderApp(),
    bodyApp = createBodyApp(),
    container = el('div', { class: 'container' }, [
      header.headerBlock,
      bodyApp.bodyApp,
    ]);
  return { container, bodyApp };
}

function createActionButton(client) {
  const changeButton = el(
      'button',
      { class: 'action-button button-reset button-change' },
      [createSvg('edit', 16, 16), 'Изменить']
    ),
    deleteButton = el(
      'button',
      { class: 'action-button button-reset button-delete' },
      [createSvg('cancel', 16, 16), 'Удалить']
    );

  changeButton.addEventListener('click', () => {
    const popup = openPopup('changeClient', client);
    document.body.append(popup);
  });

  deleteButton.addEventListener('click', () => {
    const popup = openPopup('removeClient', client);
    console.log(client);
    document.body.append(popup);
  });

  return {
    changeButton,
    deleteButton,
  };
}
