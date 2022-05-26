let page = document.querySelector('.page');
let popup = page.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let btnProfileEdit = page.querySelector('.profile__edit-button');
let btnPopupClose = page.querySelector('.popup__close-button');

let nameProfile = page.querySelector('.profile__title');
let jobProfile = page.querySelector('.profile__subtitle');
let nameInput = formElement.querySelector('.popup__input_content_name');
let jobInput = formElement.querySelector('.popup__input_content_job');

//функция открытия попапа
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
};

//функция закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened');
};

//слушатели для кнопок открыть\закрыть попап
btnProfileEdit.addEventListener('click', openPopup);
btnPopupClose.addEventListener('click', closePopup);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
