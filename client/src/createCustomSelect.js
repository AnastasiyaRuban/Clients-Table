export function createSelect() {
  const selectBlock = document.createElement('div');
  const selectNative = createNativeSelect(); //select
  const selectCustomElements = createCustomSelect(); //selectCustom, selectCustomBtn
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

  return selectBlock;
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
  optionTwitter.valueML = 'twitter';

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
function createCustomSelect() {
  const selectCustom = document.createElement('div');
  const selectCustomBtn = document.createElement('button');
  const selectCustomList = document.createElement('ul');
  const optionPhone = document.createElement('li');
  const optionAddPhone = document.createElement('li');
  const optionEmail = document.createElement('li');
  const optionVk = document.createElement('li');
  const optionFb = document.createElement('li');
  const optionTwitter = document.createElement('li');
  const optionList = [
    optionPhone,
    optionAddPhone,
    optionEmail,
    optionVk,
    optionFb,
    optionTwitter,
  ];

  selectCustom.classList.add('form__select-custom');
  selectCustomList.classList.add('form__dropdown-list', 'list-reset');
  selectCustomBtn.classList.add('form__dropdown-button', 'button-reset');

  selectCustomBtn.innerHTML = 'Телефон';
  optionPhone.style.display = 'none';

  optionPhone.innerHTML = 'Телефон';
  optionAddPhone.innerHTML = 'Доп. телефон';
  optionEmail.innerHTML = 'Email';
  optionVk.innerHTML = 'Vk';
  optionFb.innerHTML = 'Facebook';
  optionTwitter.innerHTML = 'Twitter';

  optionPhone.tabIndex = '0';
  optionAddPhone.tabIndex = '1';
  optionEmail.tabIndex = '2';
  optionVk.tabIndex = '3';
  optionFb.tabIndex = '4';
  optionTwitter.tabIndex = '5';

  optionPhone.dataset.value = 'phone';
  optionAddPhone.dataset.value = 'addPhone';
  optionEmail.dataset.value = 'email';
  optionVk.dataset.value = 'vk';
  optionFb.dataset.value = 'fb';
  optionTwitter.dataset.valueML = 'twitter';

  optionPhone.classList.add('form__dropdown-item', 'active');
  optionAddPhone.classList.add('form__dropdown-item');
  optionEmail.classList.add('form__dropdown-item');
  optionVk.classList.add('form__dropdown-item');
  optionFb.classList.add('form__dropdown-item');
  optionTwitter.classList.add('form__dropdown-item');

  selectCustomBtn.addEventListener('click', (e) => {
    e.preventDefault();
    selectCustomBtn.classList.toggle('open');
    console.log(selectCustomList.style.maxHeight);
    if (selectCustomList.style.maxHeight) {
      selectCustomList.style.maxHeight = null;
      selectCustomList.style.paddingTop = 0;
      selectCustomList.style.paddingBottom = 0;
      selectCustomList.style.borderBottom = 0;
    } else {
      selectCustomList.style.maxHeight =
        selectCustomList.scrollHeight + 20 + 'px';
      selectCustomList.style.paddingTop = '10px';
      selectCustomList.style.paddingBottom = '10px';
      selectCustomList.style.borderBottom = '1px solid var(--grey)';
    }
  });

  selectCustomList.append(
    optionPhone,
    optionAddPhone,
    optionEmail,
    optionVk,
    optionFb,
    optionTwitter
  );

  selectCustom.append(selectCustomBtn, selectCustomList);

  return { selectCustom, selectCustomBtn, selectCustomList, optionList };
}
