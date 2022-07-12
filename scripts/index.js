//Импорт необходимых данных
import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";

//Блок объявления переменных
const page = document.querySelector('.page');

const popupEdit = page.querySelector('.popup_type_edit');
const popupAdd = page.querySelector('.popup_type_add');

const formEdit = popupEdit.querySelector('.form_profile_edit');
const formAdd = popupAdd.querySelector('.form_card_add');
const btnProfileEdit = page.querySelector('.profile__edit-button');
const btnProfileAdd = page.querySelector('.profile__add-button');

const nameProfile = page.querySelector('.profile__title');
const jobProfile = page.querySelector('.profile__subtitle');
const nameInput = formEdit.querySelector('.form__input_content_name');
const jobInput = formEdit.querySelector('.form__input_content_job');

const placeInput = formAdd.querySelector('.form__input_content_place');
const urlInput = formAdd.querySelector('.form__input_content_url');

const cardsList = document.querySelector('.elements__cards');

const inputListEdit = formEdit.querySelectorAll('.form__input');



//Функция получения открытого попапа
function getOpenedPopup() {
  return page.querySelector('.popup_opened');
  //return item.closest('.popup_opened');
};

//Функция открытия попапа
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  popupElement.addEventListener('click', closePopupByClick);
  document.addEventListener('keydown', closePopupByKeyPress);
};

/*
//Функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKeyPress);
  document.removeEventListener('click', closePopupByClick);
};
*/

//Функция закрытия попапа (поскольку активным может быть только один, аргумент можно не передавать)
function closePopup() {
  const openedPopup = getOpenedPopup();
  document.removeEventListener('keydown', closePopupByKeyPress);
  document.removeEventListener('click', closePopupByClick);
  openedPopup.classList.remove('popup_opened');
};

//Функция закрытия попапа на нажатие ESC
function closePopupByKeyPress(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
};

//Функция закрытия попапа на клик по оверлэю
function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup();
  }
};

//Функция открытия попапа редактирования профиля
function openPopupEdit() {

  nameInput.value = nameProfile.textContent;  //заполняем поля ввода данными из профиля
  jobInput.value = jobProfile.textContent;
  //nameInput.dispatchEvent(new Event('input'));  //делаем имитацию нажатия на клавишу чтобы сработал обработчик для валидации формы,
  //тк если оставить 1 символ в любом поле, закрыть и заново открыть попап ошибка остается висеть поскольку еще не было события input для полей формы и функции не вызываются
  //jobInput.dispatchEvent(new Event('input'));  //делаем имитацию нажатия на клавишу чтобы сработал обработчик для валидации формы,
  //тк если оставить 1 символ в любом поле, закрыть и заново открыть попап ошибка остается висеть поскольку еще не было события input для полей формы и функции не вызываются
  const btnSubmitObject = {
    buttonElement: formEdit.querySelector('.form__save-button'),
    inactiveButtonClass: toValidateList.inactiveButtonClass
  };

  inputListEdit.forEach((inputElement) => {
    //создадим объект инпута для удобства (передачи его как аргумента)
    const inputObject = {
      input: inputElement,
      inputErrorClass: toValidateList.inputErrorClass,
      errorSpan: formEdit.querySelector(`.${inputElement.id}-error`)
    };
    hideInputError(inputObject);  //скрываем ошибки при открытии
  });

  activateButton(btnSubmitObject);  //активируем кнопку при открытии
  openPopup(popupEdit);
};

//Функция открытия попапа добавления карточки
function openPopupAdd() {
  openPopup(popupAdd);
};

//Функция инициализации первых 6ти карточек
function initCards() {
  initialCards.forEach((cardData) => {addCard(cardData)});
};

//Функция добавления карточки
function addCard(cardData) {
  const newCard = new Card(cardData, '#cardTemplate');
  cardsList.prepend(newCard.create());
};

//Обработчик отправки формы редактирования профиля
function formEditSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
};

//Обработчик добавления новой карточки
function formAddSubmitHandler (evt) {

  evt.preventDefault();

  const btnSubmitObject = {
    buttonElement: evt.target.querySelector('.form__save-button'),
    inactiveButtonClass: toValidateList.inactiveButtonClass
  }

  const cardData = {
    name: placeInput.value,
    link: urlInput.value
  };
  addCard(cardData);
  formAdd.reset();  //Очищаем поля формы
  deactivateButton(btnSubmitObject); //делаем кнопку неактивной
  closePopup();
};



//Слушатель для кнопки редактировать профиль
btnProfileEdit.addEventListener('click', openPopupEdit);

//Слушатель для кнопки добавить карточку
btnProfileAdd.addEventListener('click', openPopupAdd);

//Добавляем слушатели на все кнопки закрытия попапа на странице
const btnsClosePopup = page.querySelectorAll('.popup__close-button');
btnsClosePopup.forEach((btnElement) => {
  btnElement.addEventListener('click', closePopup);
});

//Слушатель для кнопки сохранения формы редактирования профиля
formEdit.addEventListener('submit', formEditSubmitHandler);

//Слушатель для кнопки создания новой карточки
formAdd.addEventListener('submit', formAddSubmitHandler);




//Создаем карточки по умолчанию
initCards();
