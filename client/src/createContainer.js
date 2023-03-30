import { getIcon } from './svgIcons.js';
import { createTable } from './createTable.js';
import { createLoader } from './createSpinner.js';
import {
  createPopupError,
  createPopupClient,
  createPopupRemoveClient,
} from './createPopups.js';
import { openPopupCreateClient } from './popupActions.js';
import { showFilteredClients } from './actions.js';

export function createContainer() {
  const container = document.createElement('div'),
    header = createHeaderApp(),
    bodyApp = createBodyApp(),
    loader = createLoader(),
    popupError = createPopupError(),
    popupCreateClient = createPopupClient('create'),
    popupRemoveClient = createPopupRemoveClient('removeClient');

  container.classList.add('wrapper');
  container.append(
    header.headerBlock,
    bodyApp.bodyApp,
    loader,
    popupError,
    popupRemoveClient,
    popupCreateClient
  );

  return {
    container,
    bodyApp,
    loader,
    popupError,
    popupRemoveClient,
    popupCreateClient,
  };
}

function createHeaderApp() {
  const headerBlock = document.createElement('header');
  const logo = getIcon('logo');
  const serachBlock = document.createElement('div');
  const searchInput = document.createElement('input');
  const filteredList = document.createElement('ul');
  let timerID = 0;

  serachBlock.append(searchInput, filteredList);
  serachBlock.classList.add('search-block');

  filteredList.classList.add('filtered-list', 'list-reset');

  searchInput.setAttribute('placeholder', 'Введите запрос');
  searchInput.classList.add('searchInput', 'input-reset');

  searchInput.addEventListener('input', (e) => {
    clearTimeout(timerID);
    timerID = setTimeout(() => {
      const value = e.target.value;
      showFilteredClients(value);
    }, 300);
  });

  headerBlock.classList.add('header');
  headerBlock.innerHTML += logo;
  headerBlock.append(serachBlock);

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

  button.classList.add('button-reset', 'addClientButton');
  button.innerHTML += getIcon('user');
  button.innerHTML += `Добавить клиента`;

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    openPopupCreateClient();
  });

  return button;
}
