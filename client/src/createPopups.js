import { closePopup } from './popupActions';
import {
  createInputBlock,
  createInputContact,
  currentId,
} from './createElements.js';
import { getIcon } from './svgIcons';
import { addClient, removeClient, changeClient } from './actions.js';

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
  const contactInputsList = document.querySelectorAll('.inputContactsGroup');
  const errorBlock = document.createElement('div');

  errorBlock.classList.add('form__errors');

  inputSurname.label.innerHTML = 'Фамилия <span>*</span>';
  inputName.label.innerHTML = 'Имя <span>*</span>';
  inputLastName.label.innerHTML = 'Отчество';

  inputsBlock.classList.add('form__inputs');

  title.classList.add('popup__title', 'title');
  title.innerHTML = 'Новый клиент';

  additionalButton.innerHTML = 'Отмена';
  additionalButton.addEventListener('click', closePopup);

  addContactButton.classList.add('form__addContact-btn', 'button-reset');

  contactsInputsBlock.classList.add('contacts__inputs');
  contactsInputsBlock.dataset.amountChild = contactInputsList.length;

  addContactButton.innerHTML += getIcon('add');
  addContactButton.innerHTML += 'Добавить контакт';
  addContactButton.setAttribute('type', 'button');
  addContactButton.addEventListener('click', () => {
    const inputContacts = createInputContact();
    inputContacts.removeContactBtn.addEventListener('click', () => {
      const contactInputsList = document.querySelectorAll(
        '.inputContactsGroup'
      );
      contactsInputsBlock.dataset.amountChild = contactInputsList.length;
      if (contactInputsList.length < 10) {
        addContactButton.style.display = 'block';
      }
    });
    contactsInputsBlock.append(inputContacts.contactField);
    const contactInputsList = document.querySelectorAll('.inputContactsGroup');
    contactsInputsBlock.dataset.amountChild = contactInputsList.length;
    if (contactInputsList.length == 10) {
      addContactButton.style.display = 'none';
    }
  });

  actionButton.setAttribute('type', 'submit');
  actionButton.innerHTML =
    '<span class="spinner-border text-primary" role="status"></span> Сохранить';
  actionButton.classList.add('popup__action-btn', 'button-reset');
  actionButton.querySelector('span').style.display = 'none';

  additionalButton.classList.add('popup__additional-btn', 'button-reset');
  additionalButton.setAttribute('type', 'button');

  form.classList.add('form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const clientDataElements = makeClientData(e, form);
    const clientData = clientDataElements.clientData;
    const inputs = clientDataElements.inputs;
    const action = popup.getAttribute('data-type');

    try {
      actionButton.querySelector('span').style.display = 'inline-block';
      if (action == 'create') {
        await addClient(clientData);
      } else await changeClient(currentId, clientData);
      closePopup();
    } catch (error) {
      if (error.name !== 'TypeError') throw error;
      if (error.errorMessages) {
        for (const errorMessage of error.errorMessages) {
          const messageError = document.createElement('p');
          messageError.classList.add('form__error', 'description');
          messageError.textContent = errorMessage.message;
          messageError.dataset.errorName = errorMessage.name;
          if (errorMessage.name == 'contacts') {
            const contactInputs = Array.from(
              form.querySelectorAll('.inputContact[name="contacts"]')
            );
            const emptyContactInputs = contactInputs.filter(
              (input) => input.value.trim() == ''
            );
            emptyContactInputs.forEach((input) =>
              input.classList.add('is-invalid')
            );
          }
          errorBlock.append(messageError);
          if (inputs[errorMessage.name]) {
            inputs[errorMessage.name].classList.add('is-invalid');
          }
        }
      }
    } finally {
      actionButton.querySelector('span').style.display = 'none';
    }
  });

  contacts.classList.add('form__contacts', 'contacts');

  inputsBlock.append(
    inputSurname.inputBlock,
    inputName.inputBlock,
    inputLastName.inputBlock
  );
  contacts.append(contactsInputsBlock, addContactButton);
  form.append(
    title,
    inputsBlock,
    contacts,
    errorBlock,
    actionButton,
    additionalButton
  );
  popupContentBlock.append(form);

  return popup;
}

export function createPopupRemoveClient(type) {
  const popupElements = createPopup(type);
  const popup = popupElements.popup;
  const popupContentBlock = popupElements.popupContentBlock;
  const title = document.createElement('h2');
  const popupContent = document.createElement('p');
  const actionButton = document.createElement('button');
  const additionalButton = document.createElement('button');

  title.textContent = 'Удалить клиента';
  title.classList.add('popup__title', 'title');

  popupContent.classList.add('popup__text', 'description');
  popupContent.textContent = 'Вы действительно хотите удалить данного клиента?';

  actionButton.textContent = 'Удалить';
  actionButton.classList.add('popup__action-btn', 'button-reset');
  actionButton.addEventListener('click', () => {
    removeClient(popup.dataset.clientId);
    closePopup();
  });
  additionalButton.textContent = 'Отмена';
  additionalButton.classList.add('popup__additional-btn', 'button-reset');
  additionalButton.setAttribute('type', 'button');
  additionalButton.addEventListener('click', closePopup);

  popupContentBlock.append(title, popupContent, actionButton, additionalButton);

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
  popupContentBlock.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  popupContentBlock.append(closeButton);
  popup.append(popupContentBlock);

  popup.dataset.type = type;

  return { popup, popupContentBlock };
}

function makeClientData(e, form) {
  let clientData = {};
  const formData = new FormData(e.target);
  const name = formData.get('name').trim();
  const surname = formData.get('surname').trim();
  const lastName = formData.get('lastName').trim();
  let contacts = [];
  const contactsForm = e.target.querySelectorAll('.inputContactsGroup');
  clientData = {
    name,
    surname,
    lastName,
    contacts,
  };

  const inputs = {};

  for (let i = 0; i < form.elements.length; i++) {
    const input = form.elements[i];

    if (!input.name) continue;
    inputs[input.name] = input;
  }

  contactsForm.forEach((contact) => {
    const typeContact = contact.querySelector('select').value;
    const valueContact = contact.querySelector('input').value.trim();

    contacts.push({ type: typeContact, value: valueContact });
  });
  return { clientData, inputs };
}

document.body.addEventListener('click', (e) => {
  closePopup();
});
