import { el } from 'redom';
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
    addButton = createAddUserButton();
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

function createAddUserButton() {
  //return button;
  const button = document.createElement('button');

  button.classList.add('button-reset', 'btn', 'addUserButton');
  button.innerHTML = `Добавить клиента`;

  return button;
}

export function addClientToTable(client) {
  const table = createTable();
  const rowTable = el('tr', { id: client.id }, [
    el('th', `${client.id}`),
    el('th', `${client.name} ${client.patronomic} ${client.surname}`),
    el('th', `${client.date}`),
    el('th', `${client.dateChanging ? client.dateChanging : ''}`),
    el('th', `${client.contacts.phone}`),
  ]);

  console.log(rowTable);
  console.log(table.tableBody);

  table.tableBody.append(rowTable);
}

// <tr>
//   <th scope='row'>1</th>
//   <td>Mark</td>
//   <td>Otto</td>
//   <td>@mdo</td>
// </tr>;

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
