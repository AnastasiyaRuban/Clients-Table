// import { logo } from './assets/images/logo.svg'; //logo - путь до картинки
import { Button } from 'bootstrap';
import './style/header.scss'; //эти стили подключатся на страницу

function createSvg(id, height, width) {
  const svg = document.createElement('svg');

  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.innerHTML = `<use xlink:href="assets/sprites/InlineSprite.svg#${id}"></use>`;

  return svg;
}

export function createHeader() {
  const headerBlock = document.createElement('div');
  const logo = createSvg('logo', 50, 50);
  const searchInput = document.createElement('input');

  headerBlock.classList.add('header');

  searchInput.setAttribute('placeholder', 'Введите запрос');
  searchInput.classList.add('searchInput', 'input-reset');

  headerBlock.append(logo, searchInput);

  return {
    headerBlock,
    searchInput,
  };
}

export function createTitle() {
  const title = document.createElement('h1');

  title.textContent = 'Клиенты';
  title.classList.add('bodyApp-title', 'mb-5');

  return title;
}

export function createBodyApp() {
  const bodyApp = document.createElement('div');
  const title = createTitle();
  const table = createTable();
  const addButton = createAddUserButton();

  bodyApp.classList.add('bodyApp', 'd-flex', 'flex-column');
  bodyApp.append(title, table, addButton);

  return bodyApp;
}

export function createTableHead() {
  const head = `
  <th><button class="button-reset">ID</button></th>
  <th><button class="button-reset">Фамилия Имя Отчество</button></th>
  <th><button class="button-reset">Дата и время создания</button></th>
  <th><button class="button-reset">Последнее изменение</button></th>
  <th>Контакты</th>
  <th>Действия</th>`;
  const tableHead = `<thead><tr>${head}</tr></thead>`;

  return tableHead;
}

// export function createTableBody(data) {}

export function createTable() {
  const tableHead = createTableHead(),
    table = document.createElement('table');

  table.classList.add('table', 'mb-5');
  table.innerHTML = `${tableHead}`;

  return table;
}

export function createAddUserButton() {
  const button = document.createElement('button');
  button.classList.add('button-reset', 'btn', 'addUserButton');

  button.innerHTML = `Добавить клиента`;

  return button;
}
