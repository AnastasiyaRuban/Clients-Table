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
export function removeClient(id) {
  deleteClient(id);
  const tableBody = document.querySelector('.table_body');
  const clientRow = tableBody.querySelector(`[data-id='${id}']`);
  clientRow.remove();
}
