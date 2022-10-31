// import { logo } from './assets/images/logo.svg'; //logo - путь до картинки
import './style/header.scss'; //эти стили подключатся на страницу
import { svg } from 'redom';

import icons from '../assets/sprites/InlineSprite.svg';

// const rendered = `
// <svg viewBox="${twitterLogo.viewBox}">
//   <use xlink:href="#${twitterLogo.id}" />
// </svg>`;

function createSvg(id, heigth, width) {
  const icon = `
<svg width="${width}" heigth="${heigth}>
  <use xlink:href="#icons.${id}" />
</svg>`;

  // const icon = svg(
  //   'svg',
  //   {
  //     // class: id,
  //     heigth,
  //     width,
  //   },
  //   svg('use', { href: `../assets/sprites/InlineSprite.svg#${id}` })
  //   // `<use xlink:href="./assets/sprites/InlineSprite.svg#${id}"></use>`
  // );
  // const svg = document.createElement('svg');
  // svg.setAttribute('width', width)
  // svg.setAttribute('heigth', width)

  // svg.innerHTML = `
  //   <svg height="${heigth}" width="${width}">
  //   <use href="./assets/sprites/InlineSprite.svg#${id}"></use>
  //   </svg>`;

  return icon;
}

export function createHeader() {
  const headerBlock = document.createElement('div');
  const logo = createSvg('logo', 50, 50);
  const searchInput = document.createElement('input');

  headerBlock.classList.add('header');

  logo.classList.add('logo');

  searchInput.setAttribute('placeholder', 'Введите запрос');
  searchInput.classList.add('searchInput', 'input-reset');

  headerBlock.append(logo, searchInput);

  return {
    headerBlock,
    searchInput,
  };
}

export function createTitle() {
  const title = document.createElement('h1');

  title.textContent = 'Клиенты';
  title.classList.add('title');

  return title;
}

export function createBodyApp() {
  const bodyApp = document.createElement('div');
  const title = createTitle();

  bodyApp.classList.add('bodyApp');
  bodyApp.append(title);

  return bodyApp;
}
