import { createContainer, createClientItem } from './createElements.js';
import { getClientsList, createClient } from './api.js';
import { openPopup } from './popup.js';
import 'bootstrap';

(async function createApp() {
  const container = createContainer(),
    tableBody = container.bodyApp.table.tableBody;

  document.body.append(container.container);

  try {
    const clientsList = await getClientsList();
    clientsList.forEach((client) => {
      tableBody.append(createClientItem(client));
    });
  } catch (error) {
    openPopup('error');
    console.log(error);
  } finally {
    container.loader.style.display = 'none';
  }
})();
