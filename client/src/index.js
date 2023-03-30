import { createContainer } from './createContainer';
import { createClientItem } from './createElements.js';
import { getClientsList } from './api.js';
import { openPopupError } from './popupActions.js';
import { checkUrl } from './actions.js';
import './style/style.scss';

(async function createApp() {
  const containerApp = createContainer();
  const tableBody = containerApp.bodyApp.table.tableBody;

  document.body.append(containerApp.container);
  checkUrl();
  try {
    const clientsList = await getClientsList();
    clientsList.forEach((client) => {
      tableBody.append(createClientItem(client));
    });
  } catch (error) {
    openPopupError(error.message);
  } finally {
    containerApp.loader.style.display = 'none';
  }
  window.addEventListener('hashchange', checkUrl, false);
})();
