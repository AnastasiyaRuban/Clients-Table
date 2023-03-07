export function createTable() {
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
