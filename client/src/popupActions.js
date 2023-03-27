export function openPopupError(message) {
  const popup = document.querySelector(`[data-type="error"]`);
  popup.querySelector('p').textContent = message;
  popup.classList.add('open');
}

export function openPopupCreateClient() {
  const popup = document.querySelector(`[data-type="create"]`);
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
    if (contactsInputs) {
      contactsInputs.dataset.amountChild = 0;
    }
    if (contactsGroups) {
      contactsGroups.forEach((contact) => contact.remove());
    }
    if (form) {
      form.reset();
    }
    if (popup.dataset.clientId) {
      popup.removeAttribute('data-client-id');
    }
    popup.classList.remove('open');
  });
}
