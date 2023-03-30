import { deleteClient } from './createElements.js';

export function openPopupError(message) {
  const popup = document.querySelector(`[data-type="error"]`);
  popup.querySelector('p').textContent = message;
  popup.classList.add('open');
}

export function openPopupCreateClient() {
  const popup = document.querySelector(`#create-change`);
  popup.classList.add('open');
}
export function openPopupRemoveClient(id) {
  const popup = document.querySelector(`[data-type="removeClient"]`);
  popup.dataset.clientId = id;
  popup.classList.add('open');
}

export function closePopup() {
  const popups = document.querySelectorAll('.popup.open');

  popups.forEach((popup) => {
    const contactsGroups = popup.querySelectorAll('.inputContactsGroup');
    const contactsInputs = popup.querySelector('.contacts__inputs');
    const form = popup.querySelector('.form');
    const title = popup.querySelector('.title');
    const additionalBtn = popup.querySelector('.popup__additional-btn');

    if (additionalBtn) {
      additionalBtn.innerHTML = 'Отмена';
      additionalBtn.removeEventListener('click', deleteClient);
      additionalBtn.addEventListener('click', closePopup);
    }

    if (popup.getAttribute('data-type') == 'changeClient') {
      popup.dataset.type = 'create';
      popup.removeAttribute('data-client-id');
    }
    if (contactsInputs) {
      contactsInputs.dataset.amountChild = 0;
    }
    if (contactsGroups) {
      contactsGroups.forEach((contact) => contact.remove());
    }
    if (form) {
      const inputs = form.querySelectorAll('.form__input');
      const errors = form.querySelector('.form__errors');
      const btn = form.querySelector('.popup__action-btn');
      if (errors) {
        errors.replaceChildren();
      }
      inputs.forEach((input) => input.classList.remove('is-invalid'));
      form.reset();
      btn.removeAttribute('disabled');
    }
    if (title) {
      title.innerHTML = 'Новый клиент';
    }
    if (popup.dataset.clientId) {
      popup.removeAttribute('data-client-id');
    }
    popup.classList.remove('open');
  });

  window.location.hash = '';
}
