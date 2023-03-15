import { getIcon } from './svgIcons';
import { getClientsList } from './api.js';

export function createTable() {
  // return {table, tableBody};
  const tableHead = createTableHead(),
    table = document.createElement('table'),
    tableBody = document.createElement('tbody');

  tableBody.classList.add('table_body');
  table.classList.add('table', 'mb-5');
  table.append(tableHead, tableBody);
  return { table, tableBody };
}

function createTableHead() {
  const tableHead = document.createElement('thead');
  const rowHead = document.createElement('tr');

  const idCell = document.createElement('th');
  const nameCell = document.createElement('th');
  const createCell = document.createElement('th');
  const updateCell = document.createElement('th');
  const contactsCell = document.createElement('th');
  const actionCell = document.createElement('th');

  idCell.setAttribute('scope', 'col');
  nameCell.setAttribute('scope', 'col');
  createCell.setAttribute('scope', 'col');
  updateCell.setAttribute('scope', 'col');
  contactsCell.setAttribute('scope', 'col');
  actionCell.setAttribute('scope', 'col');

  idCell.append(ceateSortButton('id', 'ID'));
  nameCell.append(ceateSortButton('surname', 'Фамилия Имя Отчество'));
  createCell.append(ceateSortButton('createdAt', 'Дата и время создания'));
  updateCell.append(ceateSortButton('updatedAt', 'Последнее изменение'));

  contactsCell.innerHTML = 'Контакты';
  actionCell.innerHTML = 'Действия';

  tableHead.classList.add('table__head');

  rowHead.append(
    idCell,
    nameCell,
    createCell,
    updateCell,
    contactsCell,
    actionCell
  );
  tableHead.append(rowHead);

  return tableHead;
}

function ceateSortButton(typeSort, text) {
  const btn = document.createElement('button');
  const arrowTopIcon = getIcon('arrowTop');

  btn.classList.add('table__head-btn', 'button-reset');
  btn.innerHTML += text;
  btn.innerHTML += arrowTopIcon;
  btn.setAttribute('data-sort', typeSort);

  if (typeSort == 'id') {
    btn.classList.add('active');
  }

  btn.addEventListener('click', (e) => sortTable(e.target.dataset.sort));
  return btn;
}

async function sortTable(typeSort) {
  const tableBody = document.querySelector('.table_body');
  tableBody.replaceChildren();

  const clientsList = await getClientsList();
  const sortClientsList = clientsList.sort(sortByField(typeSort));

  console.log(sortClientsList);
}

function sortByField(field) {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
}
