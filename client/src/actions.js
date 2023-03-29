import {
  getClientsList,
  createClient,
  deleteClient,
  updateClient,
} from './api';
import { createClientItem } from './createElements.js';

export async function addClient(data) {
  await createClient(data);
  const updateClientsList = await getClientsList();
  const tableBody = document.querySelector('.table_body');
  tableBody.replaceChildren();
  updateClientsList.forEach((client) => {
    tableBody.append(createClientItem(client));
  });
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
  const tableBody = document.querySelector('.table_body');
  tableBody.replaceChildren();
  updateClientsList.forEach((client) => {
    tableBody.append(createClientItem(client));
  });
}
