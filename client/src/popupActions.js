export function openPopupError(message) {
  const popup = document.querySelector(`[data-type="error"]`);
  popup.querySelector('p').textContent = message;
  popup.classList.add('open');
}

export function openPopupCreateClient() {
  const popup = document.querySelector(`[data-type="create"]`);
  popup.classList.add('open');
}

export function closePopup() {
  const popups = document.querySelectorAll('.popup.open');

  popups.forEach((popup) => {
    const contactsGroups = popup.querySelectorAll('.inputContactsGroup');
    const form = popup.querySelector('.form');

    contactsGroups.forEach((contact) => contact.remove());

    if (form) {
      form.reset();
    }
    popup.classList.remove('open');
  });
}
