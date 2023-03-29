export function createSelect(contact) {
  const selectBlock = document.createElement('div');
  const selectNative = createNativeSelect(); //select
  const selectCustomElements = createCustomSelect(contact); //selectCustom, selectCustomBtn
  const selectCustom = selectCustomElements.selectCustom;
  const selectCustomItems = selectCustomElements.optionList;
  const selectCustomList = selectCustomElements.selectCustomList;
  const selectCustomBtn = selectCustomElements.selectCustomBtn;

  selectCustomItems.forEach((item) => {
    item.addEventListener('click', () => {
      const selectedItemText = item.textContent;
      const dataValue = item.dataset.value;
      selectCustomItems.forEach((item) => (item.style.display = 'block'));
      item.style.display = 'none';
      selectCustomBtn.textContent = selectedItemText;
      selectCustomList.style.maxHeight = 0;
      selectCustomList.style.paddingTop = 0;
      selectCustomList.style.paddingBottom = 0;
      selectCustomList.style.borderBottom = 0;

      selectNative.value = dataValue;
    });
  });

  selectBlock.classList.add('selectBlock');
  selectBlock.append(selectNative, selectCustom);

  return { selectBlock, selectNative, selectCustom };
}

function createNativeSelect() {
  const select = document.createElement('select');
  const optionPhone = document.createElement('option');
  const optionAddPhone = document.createElement('option');
  const optionEmail = document.createElement('option');
  const optionVk = document.createElement('option');
  const optionFb = document.createElement('option');
  const optionTwitter = document.createElement('option');

  select.classList.add('form__select');
  select.name = 'type-contact';

  // if (contact) {
  //   select.value = contact.type;
  // } else {
  //   select.value = 'phone';
  // }

  optionPhone.innerHTML = 'Телефон';
  optionAddPhone.innerHTML = 'Доп. телефон';
  optionEmail.innerHTML = 'Email';
  optionVk.innerHTML = 'Vk';
  optionFb.innerHTML = 'Facebook';
  optionTwitter.innerHTML = 'Twitter';

  optionPhone.value = 'phone';
  optionAddPhone.value = 'addPhone';
  optionEmail.value = 'email';
  optionVk.value = 'vk';
  optionFb.value = 'fb';
  optionTwitter.value = 'twitter';

  select.append(
    optionPhone,
    optionAddPhone,
    optionEmail,
    optionVk,
    optionFb,
    optionTwitter
  );

  return select;
}
function createCustomSelect(contact) {
  const selectCustom = document.createElement('div');
  const selectCustomBtn = document.createElement('button');
  const selectCustomList = document.createElement('ul');
  const optionPhone = document.createElement('li');
  const optionAddPhone = document.createElement('li');
  const optionEmail = document.createElement('li');
  const optionVk = document.createElement('li');
  const optionFb = document.createElement('li');
  const optionTwitter = document.createElement('li');
  let optionList = [];
  let tabIndex = 0;

  const contactTypes = {
    phone: 'Телефон',
    addPhone: 'Доп. телефон',
    email: 'Email',
    vk: 'Vk',
    fb: 'Facebook',
    twitter: 'Twitter',
  };

  selectCustom.classList.add('form__select-custom');
  selectCustomList.classList.add('form__dropdown-list', 'list-reset');
  selectCustomBtn.classList.add('form__dropdown-button', 'button-reset');

  if (!contact) {
    selectCustomBtn.innerHTML = 'Телефон';
  } else {
    selectCustomBtn.innerHTML = contactTypes[contact.type];
  }

  for (let [key, value] of Object.entries(contactTypes)) {
    const option = document.createElement('li');
    optionList.push(option);
    option.innerHTML = value;
    option.tabIndex = String(tabIndex);
    tabIndex++;
    option.dataset.value = key;
    option.classList.add('form__dropdown-item');
    selectCustomList.append(option);

    if (value == selectCustomBtn.innerHTML) {
      option.style.display = 'none';
    }
  }

  selectCustomBtn.addEventListener('click', (e) => {
    e.preventDefault();
    selectCustomBtn.classList.toggle('open');
    if (selectCustomList.style.maxHeight) {
      closeSelect();
    } else {
      selectCustomList.style.maxHeight =
        selectCustomList.scrollHeight + 20 + 'px';
      selectCustomList.style.paddingTop = '10px';
      selectCustomList.style.paddingBottom = '10px';
      selectCustomList.style.borderBottom = '1px solid var(--grey)';
    }
  });

  document.body.addEventListener('click', (e) => {
    if (e.target != selectCustomBtn) {
      selectCustomBtn.classList.remove('open');
      closeSelect();
    }
  });

  function closeSelect() {
    selectCustomList.style.maxHeight = null;
    selectCustomList.style.paddingTop = 0;
    selectCustomList.style.paddingBottom = 0;
    selectCustomList.style.borderBottom = 0;
  }

  selectCustom.append(selectCustomBtn, selectCustomList);

  return { selectCustom, selectCustomBtn, selectCustomList, optionList };
}
