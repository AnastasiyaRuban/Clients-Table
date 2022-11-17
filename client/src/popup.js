import { el } from 'redom';

export function openPopup(goal, client = {}) {
  const popup = document.createElement('div'),
    popupContent = document.createElement('div'),
    title = document.createElement('h2'),
    closeButton = document.createElement('button'),
    actionButton = document.createElement('button'),
    additionalButton = document.createElement('button'),
    popupForm = createForm(client),
    addContactButton = createButtonAddContact();

  popup.classList.add(
    'popup',
    'd-flex',
    'justify-content-center',
    'align-items-center'
  );
  popupContent.classList.add(
    'popupContent',
    'flex-column',
    'd-flex',
    'align-items-center'
  );
  title.classList.add('titlePopup', 'title');
  closeButton.classList.add('closeButtonPopup', 'button-reset');
  actionButton.classList.add('actionButtonPopup', 'button-reset');
  additionalButton.classList.add('additionalButtonPopup', 'button-reset');

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
  }

  popupContent.append(
    title,
    closeButton,
    popupForm,
    // goal == 'changeClient' ? createInputContact(client) : '',
    addContactButton,
    actionButton,
    additionalButton
  );
  popup.append(popupContent);

  closeButton.addEventListener('click', () => closePopup());
  actionButton.addEventListener('click', () => closePopup());
  additionalButton.addEventListener('click', () => closePopup());

  addContactButton.addEventListener('click', () => {
    const inputContacts = createInputContact();
    popupForm.append(inputContacts.inputContact);
    // inputContacts.select.value = 3;
    // inputContacts.input.value = 'dfdfdf';
    console.log(createInputContact());
  });

  return popup;
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
  console.log(client);

  return form;
}

function createButtonAddContact() {
  const button = el(
    'button',
    {
      class: 'buttonAddContact button-reset mb-5',
    },
    'Добавить контакт'
  );

  return button;
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

  const inputContact = el(
    'div',
    { class: 'input-group input-reset inputContactsGroup mb-3' },
    [select, input]
  );

  inputContact.addEventListener('click', () => {
    console.log(document.querySelector('select').value);
  });
  return { inputContact, select, input };
}
