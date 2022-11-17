import { el } from 'redom';
import { openPopup } from './popup.js';
import './style/header.scss';

function createSvg(id, height, width) {
  const svg = document.createElement('svg');

  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.innerHTML = `<use xlink:href="assets/sprites/InlineSprite.svg#${id}"></use>`;

  return svg;
}

function createHeader() {
  const headerBlock = document.createElement('div'),
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

function createTitle() {
  const title = document.createElement('h1');

  title.textContent = 'Клиенты';
  title.classList.add('bodyApp-title', 'mb-5');

  return title;
}

function createBodyApp() {
  //возвращает bodyApp, table, addButton
  const bodyApp = document.createElement('div'),
    title = createTitle(),
    table = createTable(),
    addButton = createaddClientButton();
  bodyApp.classList.add('bodyApp', 'd-flex', 'flex-column');
  bodyApp.append(title, table.table, addButton);

  return {
    bodyApp,
    table,
    addButton,
  };
}

function createTableHead() {
  //  return tableHead

  const head = `
  <th scope="col"><button class="button-reset">ID</button></th>
  <th scope="col"><button class="button-reset">Фамилия Имя Отчество</button></th>
  <th scope="col"><button class="button-reset">Дата и время создания</button></th>
  <th scope="col"><button class="button-reset">Последнее изменение</button></th>
  <th scope="col">Контакты</th>
  <th scope="col">Действия</th>`;
  const tableHead = `<thead><tr>${head}</tr></thead>`;

  return tableHead;
}

function createTable() {
  // return {table, tableBody};
  const tableHead = createTableHead(),
    table = document.createElement('table'),
    tableBody = document.createElement('tbody');

  tableBody.classList.add('table_body');
  table.classList.add('table', 'mb-5');
  table.innerHTML = `${tableHead}`;
  table.append(tableBody);
  return { table, tableBody };
}

function createaddClientButton() {
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
  const header = createHeader(),
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
