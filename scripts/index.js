//Импорт необходимых данных
import { initialCards, validateList } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//Блок объявления переменных
const page = document.querySelector('.page');

const popupList = page.querySelectorAll('.popup');
const popupEdit = page.querySelector('.popup_type_edit');
const popupAdd = page.querySelector('.popup_type_add');
export const popupCard = page.querySelector('.popup_type_card');

export const popupCardImage = popupCard.querySelector('.card-scale__image');
export const popupCardCaption = popupCard.querySelector('.card-scale__caption');

const formEdit = popupEdit.querySelector('.form_profile_edit');
const formAdd = popupAdd.querySelector('.form_card_add');
const buttonProfileEdit = page.querySelector('.profile__edit-button');
const buttonProfileAdd = page.querySelector('.profile__add-button');

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
};

//Функция открытия попапа
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKeyPress);
};

//Функция закрытия попапа
function closePopup(popupElement) {
  document.removeEventListener('keydown', closePopupByKeyPress);
  popupElement.classList.remove('popup_opened');
};

/*
//Функция закрытия попапа (поскольку активным может быть только один, аргумент можно не передавать)
function closePopup() {
  const openedPopup = getOpenedPopup();
  document.removeEventListener('keydown', closePopupByKeyPress);
  openedPopup.classList.remove('popup_opened');
};
*/

//Функция закрытия попапа на нажатие ESC
function closePopupByKeyPress(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = getOpenedPopup();
    closePopup(openedPopup);
  }
};

//Функция закрытия попапа на клик по оверлэю
function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    const openedPopup = evt.target;
    closePopup(openedPopup);
  }
};

//Функция открытия попапа редактирования профиля
function openPopupEdit() {
  nameInput.value = nameProfile.textContent;  //заполняем поля ввода данными из профиля
  jobInput.value = jobProfile.textContent;

  formEditValidator.hideErrors();  //скрываем ошибки при открытии
  formEditValidator.activateSaveButton();  //активируем кнопку при открытии
  openPopup(popupEdit);
};

//Функция открытия попапа добавления карточки
function openPopupAdd() {
  openPopup(popupAdd);
};

//Обработчик отправки формы редактирования профиля
function formEditSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  const openedPopup = evt.target.closest('.popup_opened');
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(openedPopup);
};

//Обработчик добавления новой карточки
function formAddSubmitHandler (evt) {
  evt.preventDefault();
  const openedPopup = evt.target.closest('.popup_opened');
  const cardData = {
    name: placeInput.value,
    link: urlInput.value
  };
  insertCard(generateCard(cardData));
  formAdd.reset();  //Очищаем поля формы
  formAddValidator.deactivateSaveButton(); //делаем кнопку неактивной
  closePopup(openedPopup);
};

//Функция добавления карточки
function generateCard(cardData) {
  const card = new Card(cardData, '#cardTemplate');
  return card.createCardElement();
};

//Функция вставки карточки в разметку
function insertCard(cardElement) {
  cardsList.prepend(cardElement);
};

//Функция инициализации первых 6ти карточек
function initCards() {
  initialCards.forEach((cardData) => {
    const cardElement = generateCard(cardData);
    insertCard(cardElement);
    });
};






//Слушатель для кнопки редактировать профиль
buttonProfileEdit.addEventListener('click', openPopupEdit);

//Слушатель для кнопки добавить карточку
buttonProfileAdd.addEventListener('click', openPopupAdd);

//Добавляем слушатели на все кнопки закрытия попапа на странице
const buttonClosePopupList = page.querySelectorAll('.popup__close-button');
buttonClosePopupList.forEach((buttonElement) => {
  buttonElement.addEventListener('click', (evt) => {
    const openedPopup = evt.target.closest('.popup_opened');
    closePopup(openedPopup);
  });
});

//Слушатель для кнопки сохранения формы редактирования профиля
formEdit.addEventListener('submit', formEditSubmitHandler);

//Слушатель для кнопки создания новой карточки в попапе
formAdd.addEventListener('submit', formAddSubmitHandler);

//Добавляем слушатели на все попапы (для закрытия попапа кликом на оверлей)
popupList.forEach((popupItem)=>{
  popupItem.addEventListener('click', closePopupByClick);
});




//Создаем карточки по умолчанию
initCards();

//Создаем валидаторы для форм
const formEditValidator = new FormValidator(validateList, formEdit);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(validateList, formAdd);
formAddValidator.enableValidation();
