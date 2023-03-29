import {
  getClientsList,
  createClient,
  deleteClient,
  updateClient,
  filterClients,
} from './api';
import { createClientItem } from './createElements.js';

export async function addClient(data) {
  await createClient(data);
  const updateClientsList = await getClientsList();
  rerenderTable(updateClientsList);
}
export function removeClient(clientId) {
  deleteClient(clientId);
  const tableBody = document.querySelector('.table_body');
  const clientRow = tableBody.querySelector(`[data-id='${clientId}']`);
  clientRow.remove();
}
export async function changeClient(clientId, data) {
  await updateClient(clientId, data);
  const updateClientsList = await getClientsList();
  rerenderTable(updateClientsList);
}

export async function showFilteredClients(search) {
  const filteredClientsList = await filterClients(search);
  rerenderTable(filteredClientsList);
}

function rerenderTable(list) {
  const tableBody = document.querySelector('.table_body');
  tableBody.replaceChildren();
  list.forEach((item) => {
    tableBody.append(createClientItem(item));
  });
}
