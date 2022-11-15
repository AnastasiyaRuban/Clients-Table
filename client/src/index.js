import { createContainer, addClientToTable } from './createElements.js';
import { getClientsList, createClient } from './api.js';
import { openPopup } from './popup.js';
import 'bootstrap';

(async function createApp() {
  const container = createContainer(),
    clientsList = await getClientsList();

  console.log(container);
  document.body.append(container.container);
  clientsList.forEach((client) => {
    console.log(client);
    const tableBody = container.bodyApp.table.tableBody;
    const clientRow = addClientToTable(client);
    tableBody.append(clientRow);
  });

  const addUserButton = document.querySelector('.addUserButton');
  addUserButton.addEventListener('click', () => {
    const popup = openPopup('addUser');
    document.body.append(popup);
  });
})();
