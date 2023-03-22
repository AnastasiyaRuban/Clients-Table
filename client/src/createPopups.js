import { closePopup } from './popupActions';
import { createInputBlock, createInputContact } from './createElements.js';
import { getIcon } from './svgIcons';

export function createPopupError() {
  const popupElements = createPopup('error');
  const popup = popupElements.popup;
  const popupContentBlock = popupElements.popupContentBlock;
  const popupContent = document.createElement('p');

  popupContent.classList.add('popup__text');

  popupContentBlock.append(popupContent);

  return popup;
}
export function createPopupClient(type) {
  const popupElements = createPopup(type);
  const popup = popupElements.popup;
  const popupContentBlock = popupElements.popupContentBlock;
  const form = document.createElement('form');
  const title = document.createElement('h2');
  const inputsBlock = document.createElement('div');
  const inputName = createInputBlock('name');
  const inputLastName = createInputBlock('lastName');
  const inputSurname = createInputBlock('surname');
  const contacts = document.createElement('div');
  const contactsInputsBlock = document.createElement('div');
  const addContactButton = document.createElement('button');
  const actionButton = document.createElement('button');
  const additionalButton = document.createElement('button');

  inputSurname.label.innerHTML = 'Фамилия <span>*</span>';
  inputName.label.innerHTML = 'Имя <span>*</span>';
  inputLastName.label.innerHTML = 'Отчество';

  inputsBlock.classList.add('form__inputs');

  title.classList.add('form__title', 'title');
  if (type == 'create') {
    title.innerHTML = 'Новый клиент';
    additionalButton.innerHTML = 'Отмена';
  }
  additionalButton.addEventListener('click', closePopup);

  addContactButton.classList.add('form__addContact-btn', 'button-reset');

  contactsInputsBlock.classList.add('contacts__inputs');

  addContactButton.innerHTML += getIcon('add');
  addContactButton.innerHTML += 'Добавить контакт';
  addContactButton.setAttribute('type', 'button');
  addContactButton.addEventListener('click', () => {
    const inputContacts = createInputContact();
    contactsInputsBlock.append(inputContacts.contactField);
  });

  actionButton.setAttribute('type', 'submit');
  actionButton.textContent = 'Сохранить';
  actionButton.classList.add('form__action-btn', 'button-reset');

  additionalButton.classList.add('form__additional-btn', 'button-reset');
  additionalButton.setAttribute('type', 'button');

  form.classList.add('form');

  contacts.classList.add('form__contacts', 'contacts');

  inputsBlock.append(
    inputName.inputBlock,
    inputLastName.inputBlock,
    inputSurname.inputBlock
  );
  contacts.append(contactsInputsBlock, addContactButton);
  form.append(title, inputsBlock, contacts, actionButton, additionalButton);
  popupContentBlock.append(form);

  return popup;
}

function createPopup(type) {
  const popup = document.createElement('div');
  const closeButton = document.createElement('button');
  const popupContentBlock = document.createElement('div');

  popup.classList.add('popup');
  popupContentBlock.classList.add('popup__сontent');
  closeButton.classList.add('popup__close-btn', 'button-reset');

  closeButton.addEventListener('click', closePopup);

  popupContentBlock.append(closeButton);
  popup.append(popupContentBlock);

  popup.dataset.type = type;

  return { popup, popupContentBlock };
}
