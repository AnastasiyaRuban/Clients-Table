import { createHeader, createBodyApp } from './createElements.js';
import { openPopup } from './popup.js';

(function createApp() {
  const header = createHeader();
  const bodyApp = createBodyApp();
  document.body.append(header.headerBlock, bodyApp);

  const addUserButton = document.querySelector('.addUserButton');
  addUserButton.addEventListener('click', () => {
    const popup = openPopup('changeUser');
    document.body.append(popup);
  });
})();
