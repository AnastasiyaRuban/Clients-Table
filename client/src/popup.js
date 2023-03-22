import { el } from 'redom';
import { createClient, deleteClient, updateClient } from './api';
import { createClientItem, createClientCells } from './createElements';
import { getIcon } from './svgIcons';

export function openPopup(goal, client = {}) {
  const popup = document.querySelector('.popup');
  const popupContent = createPopupContent(goal, client);
  popup.replaceChildren();
  popup.append(popupContent);
  popup.setAttribute('data-goal', goal);
  popup.classList.add('open');
}

function createPopupContent(goal, client) {
  const popupContent = document.createElement('div'),
    title = document.createElement('h2'),
    closeButton = document.createElement('button'),
    actionButton = document.createElement('button'),
    additionalButton = document.createElement('button'),
    popupForm = createForm(client, goal),
    addContactButton = document.createElement('button');

  popupContent.classList.add(
    'popup__сontent',
    'flex-column',
    'd-flex',
    'align-items-center'
  );
  title.classList.add('popup__title', 'title');
  closeButton.classList.add('popup__close-btn', 'button-reset');
  actionButton.classList.add('popup__action-btn', 'button-reset');
  additionalButton.classList.add('popup__additional-btn', 'button-reset');
  addContactButton.classList.add(
    'popup__addContact-btn',
    'button-reset',
    'mb-5'
  );

  addContactButton.textContent = 'Добавить контакт';
  actionButton.setAttribute('type', 'submit');
  additionalButton.setAttribute('type', 'button');
  addContactButton.setAttribute('type', 'button');

  popupContent.append(title, closeButton);

  switch (goal) {
    case 'addClient':
      rewriteContent('Новый клиент', 'Сохранить', 'Отмена');
      popupForm.append(addContactButton, actionButton, additionalButton);
      popupContent.append(popupForm);
      break;
    case 'changeClient':
      rewriteContent(
        `Изменить данные <span>ID: ${client.id}</span>`,
        'Сохранить',
        'Удалить клиента'
      );
      popupForm.append(
        createContactsInfo(client),
        addContactButton,
        actionButton,
        additionalButton
      );

      popupContent.append(popupForm);
      break;
    case 'removeClient':
      rewriteContent('Удалить клиента', 'Удалить', 'Отмена');
      popupForm.replaceChildren();
      popupForm.append(
        el(
          'p',
          { class: 'delete-question' },
          'Вы действительно хотите удалить данного клиента?'
        ),
        actionButton,
        additionalButton
      );
      popupContent.append(popupForm);
      break;
    case 'error':
      rewriteContent('Что-то пошло не так...</br>Попробуйте повторить позже');
      break;
  }

  function rewriteContent(
    titles = '',
    actionButtons = '',
    additionalButtons = ''
  ) {
    title.innerHTML = titles;
    actionButton.textContent = actionButtons;
    additionalButton.textContent = additionalButtons;
  }

  closeButton.addEventListener('click', closePopup);

  additionalButton.addEventListener('click', closePopup);
  addContactButton.addEventListener('click', () => {
    const inputContacts = createInputContact();
    popupForm.append(inputContacts.contactField);
  });

  return popupContent;
}

function createInputGroup(label, id, type, classGroup, inputValue = '') {
  const labelInput = el(
    'label',
    {
      for: id,
      style: 'font-size: 0.9rem; margin-bottom: 5px; width: 100%',
      class: `label-${id}`,
    },
    label
  );

  const input = el(
    'input',
    {
      id: id,
      class: `form-control input-reset input-${id}`,
      name: id,
      type: type,
      required: id == 'lastName' ? false : true,
      value: inputValue,
    },
    ''
  );

  input.style.height = inputValue == '' ? '0px' : '20px';
  const inputGroup = el(
    'div',
    {
      class: `form-group ${classGroup}  mb-3`,
    },
    [labelInput, input]
  );

  labelInput.addEventListener('click', () => {
    input.style.height = '20px';
    input.style.borderBottom = '1px solid rgba(200, 197, 209, 0.5)';
    labelInput.style.borderBottom = 'none';
  });

  return inputGroup;
}

function createForm(client = {}, goal) {
  const form = el(
    'form',
    {
      class: 'd-flex flex-column form',
      style: 'width: 100%',
    },
    [
      createInputGroup(
        'Фамилия',
        'surname',
        'text',
        'groupSurname',
        client.surname
      ),
      createInputGroup('Имя', 'name', 'text', 'groupName', client.name),
      createInputGroup(
        'Отчество',
        'lastName',
        'text',
        'groupLastName',
        client.lastName
      ),
    ]
  );

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    let clientData = {};
    if (goal != 'removeClient') {
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

      contactsForm.forEach((contact) => {
        const typeContact = contact.querySelector('select').value;
        const valueContact = contact.querySelector('input').value.trim();

        contacts.push({ type: typeContact, value: valueContact });
      });
    }
    if (goal == 'addClient') {
      const foo = await addClient(clientData);
      console.log(foo);
    } else if (goal == 'changeClient') {
      console.log(clientData);
      await changeClient(clientData, client.id);
    } else if (goal == 'removeClient') {
      removeClient(client.id);
    }

    closePopup();
  });

  return form;
}

async function addClient(data) {
  try {
    const client = await createClient(data);
    console.log(client.errors);
    const clientItem = createClientItem(client);
    const clientsTable = document.querySelector('.table_body');
    clientsTable.append(clientItem);
  } catch (error) {
    // return error;
  }
}

async function changeClient(data, id) {
  const client = await updateClient(id, data);
  const clientСells = createClientCells(client);
  const clientRow = document.querySelector(`[data-id="${id}"]`);

  clientRow.replaceChildren();
  for (let value of Object.values(clientСells)) {
    clientRow.append(value);
  }
}

function removeClient(id) {
  deleteClient(id);

  const clientsRow = document.querySelector(`[data-id="${id}"]`);
  clientsRow.remove();
}
