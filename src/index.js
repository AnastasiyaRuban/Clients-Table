import { createHeader, createBodyApp } from './createElements.js';
import { svg, mount } from 'redom';

(function createApp() {
  const header = createHeader();
  const bodyApp = createBodyApp();
  console.log(header, bodyApp);
  document.body.append(header.headerBlock, bodyApp);
})();
