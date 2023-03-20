import { createContainer, createClientItem } from './createElements.js';
import { getClientsList } from './api.js';
import { openPopupError } from './popup.js';
import 'bootstrap';

(async function createApp() {
  const containerApp = createContainer(),
    tableBody = containerApp.bodyApp.table.tableBody;

  document.body.append(containerApp.container);

  try {
    const clientsList = await getClientsList();
    clientsList.forEach((client) => {
      tableBody.append(createClientItem(client));
    });
  } catch (error) {
    // console.log(error.message);
    openPopupError(error.message);
  } finally {
    containerApp.loader.style.display = 'none';
  }
})();
