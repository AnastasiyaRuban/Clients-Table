import { getIcon } from './svgIcons';

export function createTable() {
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
  btn.dataset.direction = 'descending';

  if (typeSort == 'id') {
    btn.classList.add('active');
    btn.dataset.direction = 'ascending';
  }

  btn.addEventListener('click', (e) => {
    if (e.target.classList.contains('active')) {
      if (e.target.dataset.direction == 'ascending') {
        e.target.dataset.direction = 'descending';
      } else if (e.target.dataset.direction == 'descending') {
        e.target.dataset.direction = 'ascending';
      }
    } else {
      const sortBtns = document.querySelectorAll('.table__head-btn');
      sortBtns.forEach((btn) => btn.classList.remove('active'));
      e.target.classList.add('active');
      e.target.dataset.direction = 'ascending';
    }

    sortTable(e.target.dataset.sort, e.target.dataset.direction);
  });
  return btn;
}

function sortTable(typeSort, direction = 'ascending') {
  const tableBody = document.querySelector('.table_body');
  const rowsTable = Array.from(tableBody.querySelectorAll('tr'));
  const sortedRowsTable = rowsTable.sort(sortByField(typeSort, direction));
  sortedRowsTable.forEach((row) => {
    tableBody.append(row);
  });
}

function sortByField(field, direction) {
  if (direction == 'ascending') {
    return (a, b) => (a.dataset[field] > b.dataset[field] ? 1 : -1);
  }
  return (a, b) => (a.dataset[field] < b.dataset[field] ? 1 : -1);
}
