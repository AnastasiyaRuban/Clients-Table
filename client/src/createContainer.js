import { getIcon } from './svgIcons.js';
import { createTable } from './createTable.js';
import { createLoader } from './createSpinner.js';
import {
  createPopupError,
  createPopupClient,
  createPopupRemoveClient,
} from './createPopups.js';
import { openPopupError } from './popupActions.js';
import { openPopupCreateClient } from './popupActions.js';
// import { showFilteredClients } from './actions.js';
import { filterClients } from './api';

export function createContainer() {
  const container = document.createElement('div'),
    header = createHeaderApp(),
    bodyApp = createBodyApp(),
    loader = createLoader(),
    popupError = createPopupError(),
    popupCreateClient = createPopupClient('create'),
    popupRemoveClient = createPopupRemoveClient('removeClient'),
    input = header.searchInput;

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
  const searchBlock = document.createElement('div');
  const searchInput = document.createElement('input');
  const filteredList = document.createElement('ul');
  const customInput = document.createElement('div');
  const spinner = document.createElement('span');
  let timerID = 0;

  customInput.classList.add('customInput');

  searchBlock.classList.add('search-block');

  filteredList.classList.add('filtered-list', 'list-reset');

  searchInput.setAttribute('placeholder', 'Введите запрос');
  searchInput.classList.add('searchInput', 'input-reset');

  spinner.setAttribute('role', 'status');
  spinner.classList.add('spinner-border', 'text-primary');
  spinner.style.display = 'none';

  headerBlock.classList.add('header');
  headerBlock.innerHTML += logo;

  customInput.prepend(searchInput, spinner);
  searchBlock.append(customInput, filteredList);
  headerBlock.append(searchBlock);

  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    filteredList.innerHTML = '';
    clearTimeout(timerID);
    filteredList.style.borderBottom = 'none';
    timerID = setTimeout(async () => {
      if (value == '') filteredList.replaceChildren();
      else {
        try {
          spinner.style.display = 'block';
          const filteredClientsList = await filterClients(value);
          filteredList.replaceChildren();
          if (filteredClientsList.length == 0) {
            const itemList = document.createElement('li');
            itemList.classList.add('filtered-none');
            itemList.textContent = 'Совпадений не найдено';
            filteredList.append(itemList);
            // filteredList.style.borderBottom = '1px solid rgba(51, 51, 51, 0.2)';
            // spinner.style.display = 'none';
          } else {
            filteredClientsList.forEach((item) => {
              const link = document.createElement('button');
              const itemList = document.createElement('li');
              itemList.classList.add('filtered-item');
              link.classList.add('button-reset', 'filtered-link');
              link.dataset.target = item.id;
              link.textContent = item.name + ' ' + item.surname;
              itemList.append(link);
              filteredList.append(itemList);
              // filteredList.style.borderBottom =
              //   '1px solid rgba(51, 51, 51, 0.2)';
              // spinner.style.display = 'none';
              link.addEventListener('click', goToClient);
            });
          }
        } catch (error) {
          openPopupError(error.message);
        } finally {
          filteredList.style.borderBottom = '1px solid rgba(51, 51, 51, 0.2)';
          spinner.style.display = 'none';
        }
      }
    }, 300);
  });

  searchInput.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  function goToClient(e) {
    const el = e.target;
    const dataId = el.getAttribute('data-target');
    const clientInTable = document.querySelector(`[data-id="${dataId}"]`);
    clientInTable.scrollIntoView({ block: 'center', behavior: 'smooth' });
    clientInTable.classList.add('active');
    setTimeout(() => {
      clientInTable.classList.remove('active');
    }, 3000);
    console.log(el.offsetParent);
    el.offsetParent.style.borderBottom = 'none';
    el.offsetParent.replaceChildren();
    searchInput.value = '';
  }

  return {
    headerBlock,
    filteredList,
    customInput,
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
