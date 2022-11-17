import { createContainer, createClientItem } from './createElements.js';
import { getClientsList, createClient } from './api.js';
import { openPopup } from './popup.js';
import 'bootstrap';

(async function createApp() {
  const container = createContainer(),
    tableBody = container.bodyApp.table.tableBody,
    clientsList = await getClientsList();

  document.body.append(container.container);

  clientsList.forEach((client) => {
    tableBody.append(createClientItem(client));
  });
})();
