import { el } from 'redom';

export function openPopup(goal, client = {}) {
  const popup = document.createElement('div'),
    popupContent = document.createElement('div'),
    title = document.createElement('h2'),
    closeButton = document.createElement('button'),
    actionButton = document.createElement('button'),
    additionalButton = document.createElement('button'),
    popupForm = createForm(client),
    addContactButton = document.createElement('button');

  popup.classList.add(
    'popup',
    'd-flex',
    'justify-content-center',
    'align-items-center'
  );
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

  switch (goal) {
    case 'addClient':
      title.textContent = 'Новый клиент';
      actionButton.textContent = 'Сохранить';
      additionalButton.textContent = 'Отмена';
      break;
    case 'changeClient':
      title.innerHTML = `Изменить данные <span>ID: ${client.id}</span>`;
      actionButton.textContent = 'Сохранить';
      additionalButton.textContent = 'Удалить клиента';
      break;
    case 'removeClient':
      title.textContent = 'Удалить клиента';
      actionButton.textContent = 'Удалить';
      additionalButton.textContent = 'Отмена';
      break;
    default:
      title.textContent = 'Что-то пошло не так...';
  }

  // popupContent.append(title, closeButton);

  // if (goal === 'removeClient') {
  //   popupContent.append(
  //     el(
  //       'p',
  //       { class: 'delete-question' },
  //       'Вы действительно хотите удалить данного клиента?'
  //     )
  //   );
  // } else if (goal === 'removeClient' || 'changeClient' || 'addClient') {
  //   popupContent.append(actionButton, additionalButton);
  // } else if (goal === 'changeClient' || 'addClient') {
  //   popupContent.append(popupForm, addContactButton);
  // } else if (goal === 'changeClient') {
  //   popupContent.append(createContactsInfo(client));
  // }

  popupContent.append(
    title,
    closeButton,
    popupForm,
    goal !== 'removeClient' ? popupForm : '',
    goal === 'changeClient' ? createContactsInfo(client) : '',
    goal !== 'removeClient' ? addContactButton : '',
    goal === 'removeClient'
      ? el(
          'p',
          { class: 'delete-question' },
          'Вы действительно хотите удалить данного клиента?'
        )
      : '',
    actionButton,
    additionalButton
  );

  popup.append(popupContent);

  closeButton.addEventListener('click', closePopup);
  actionButton.addEventListener('click', closePopup);
  additionalButton.addEventListener('click', closePopup);
  addContactButton.addEventListener('click', () => {
    const inputContacts = createInputContact();
    popupForm.append(inputContacts.contactField);
  });

  return popup;
}

function createContactsInfo({ contacts }) {
  const contactsBlock = document.createElement('div');

  for (let [key, value] of Object.entries(contacts)) {
    const inputContacts = createInputContact();

    switch (key) {
      case 'phone':
        inputContacts.select.value = 1;
        break;

      case 'addPhone':
        inputContacts.select.value = 2;
        break;

      case 'email':
        inputContacts.select.value = 3;
        break;

      case 'vk':
        inputContacts.select.value = 4;
        break;

      case 'fb':
        inputContacts.select.value = 5;
        break;

      case 'twitter':
        inputContacts.select.value = 6;
        break;
    }

    inputContacts.input.value = value;

    contactsBlock.append(inputContacts.contactField);
  }

  return contactsBlock;
}

function closePopup() {
  const popup = document.querySelector('.popup');
  popup.remove();
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
      class: `form-control input-reset input-${id}`,
      id: id,
      type: type,
      required: true,
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

function createForm(client = {}) {
  const form = el(
    'form',
    {
      class: 'd-flex flex-column',
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
        'patronymic',
        'text',
        'groupPatronymic',
        client.patronymic
      ),
    ]
  );

  return form;
}

function createInputContact() {
  const select = el(
    'select',
    {
      class: 'form-select',
      'aria-label': 'Default select example',
    },
    [
      el('option', { value: 1 }, 'Телефон'),
      el('option', { value: 2 }, 'Доп. телефон'),
      el('option', { value: 3 }, 'Email'),
      el('option', { value: 4 }, 'Vk'),
      el('option', { value: 5 }, 'Facebook'),
      el('option', { value: 6 }, 'Twitter'),
    ]
  );

  const input = el(
    'input',
    {
      type: 'text',
      class: 'form-control inputContact input-reset',
      'aria-label': 'Text input with dropdown button',
      placeholder: 'Введите данные контакта',
    },
    ''
  );

  const contactField = el(
    'div',
    { class: 'input-group input-reset inputContactsGroup mb-3' },
    [select, input]
  );

  contactField.addEventListener('click', () => {
    console.log(document.querySelector('select').value);
  });

  return { contactField, select, input };
}
