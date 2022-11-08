import { el } from 'redom';

export function openPopup(goal, client = {}) {
  const popup = document.createElement('div');
  const popupContent = document.createElement('div');
  const title = document.createElement('h2');
  const closeButton = document.createElement('button');
  const actionButton = document.createElement('button');
  const additionalButton = document.createElement('button');
  const popupBody = createForm();
  const addContactButton = createButtonAddContact();

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
    case 'addUser':
      title.textContent = 'Новый клиент';
      actionButton.textContent = 'Сохранить';
      additionalButton.textContent = 'Отмена';
      break;
    case 'changeUser':
      title.textContent = 'Изменить данные';
      actionButton.textContent = 'Сохранить';
      additionalButton.textContent = 'Удалить клиента';
      break;
    case 'removeUser':
      title.textContent = 'Удалить клиента';
      actionButton.textContent = 'Удалить';
      additionalButton.textContent = 'Отмена';
      break;
  }

  popupContent.append(
    title,
    closeButton,
    popupBody,
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
    popupBody.append(inputContacts);
  });

  return popup;
}

function closePopup() {
  const popup = document.querySelector('.popup');
  popup.remove();
}

function createInputGroup(label, id, type, classGroup, dataClient = {}) {
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
      // placeholder: label,
      // placeholder: id == 'patronimic' ? label : `${label}* `,
      id: id,
      type: type,
      required: true,
      value: (dataClient = {} ? '' : dataClient[id]),
    },
    ''
  );

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
      createInputGroup('Фамилия', 'surname', 'text', 'groupSurname'),
      createInputGroup('Имя', 'name', 'text', 'groupName'),
      createInputGroup('Отчество', 'patronimic', 'text', 'groupPatronimic'),
    ]
  );

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
  const input = el(
    'div',
    { class: 'input-group input-reset inputContactsGroup mb-3' },
    [
      el(
        'div',
        {
          class: 'input-group-prepend',
        },
        [
          el(
            'button',
            {
              class: 'btn dropdown-toggle button-reset',
              type: 'button',
              'data-toggle': 'dropdown',
              'aria-haspopup': 'true',
              'aria-expanded': 'false',
            },
            'Телефон'
          ),
          el(
            'div',
            {
              class: 'dropdown-menu',
            },
            [
              el(
                'a',
                {
                  class: 'dropdown-item',
                  href: '#',
                },
                'Доп. телефон'
              ),
              el(
                'a',
                {
                  class: 'dropdown-item',
                  href: '#',
                },
                'Email'
              ),
              el(
                'a',
                {
                  class: 'dropdown-item',
                  href: '#',
                },
                'Vk'
              ),
              el(
                'a',
                {
                  class: 'dropdown-item',
                  href: '#',
                },
                'Facebook'
              ),
              el(
                'a',
                {
                  class: 'dropdown-item',
                  href: '#',
                },
                'Twitter'
              ),
            ]
          ),
        ]
      ),
      el(
        'input',
        {
          type: 'text',
          class: 'form-control inputContact input-reset',
          ariaLabel: 'Text input with dropdown button',
          placeholder: 'Введите данные контакта',
        },
        ''
      ),
    ]
  );

  return input;
}
