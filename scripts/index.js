//Импорт необходимых данных
import { initialCards, validateList } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";

//Блок объявления переменных
const page = document.querySelector('.page');

//const popupList = page.querySelectorAll('.popup');
//const popupEdit = page.querySelector('.popup_type_edit');
//const popupAdd = page.querySelector('.popup_type_add');
//export const popupCard = page.querySelector('.popup_type_card');

export const popupCardImage = page.querySelector('.card-scale__image');
export const popupCardCaption = page.querySelector('.card-scale__caption');

const formEdit = page.querySelector('.form_profile_edit');
const formAdd = page.querySelector('.form_card_add');
const buttonProfileEdit = page.querySelector('.profile__edit-button');
const buttonProfileAdd = page.querySelector('.profile__add-button');

export const nameProfile = page.querySelector('.profile__title');
export const jobProfile = page.querySelector('.profile__subtitle');
const nameInput = formEdit.querySelector('.form__input_content_name');
const jobInput = formEdit.querySelector('.form__input_content_job');

const placeInput = formAdd.querySelector('.form__input_content_place');
const urlInput = formAdd.querySelector('.form__input_content_url');

//const cardsList = document.querySelector('.elements__cards');

const cardsSection = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        cardsSection.addItem(generateCard(item));
      }
    },
    '.elements__cards'
  );

const user = new UserInfo('.profile__title','.profile__subtitle');
const popupEdit = new PopupWithForm('.popup_type_edit', formEditSubmitHandler);
const popupAdd = new PopupWithForm('.popup_type_add', formAddSubmitHandler);
export const popupCard = new PopupWithImage('.popup_type_card');

/*
//Функция получения открытого попапа
function getOpenedPopup() {
  return new Popup('.popup_opened');
  return page.querySelector('.popup_opened');
};
*/

//Функция открытия попапа
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  //document.addEventListener('keydown', closePopupByKeyPress);
};

//Функция открытия попапа редактирования профиля
function openPopupEdit() {
  const userObject = user.getUserInfo();
  nameInput.value = userObject.name;  //заполняем поля ввода данными из профиля
  jobInput.value = userObject.job;
  formEditValidator.hideErrors();  //скрываем ошибки при открытии
  formEditValidator.activateSaveButton();  //активируем кнопку при открытии
  popupEdit.open();
};

//Функция открытия попапа добавления карточки
function openPopupAdd() {
  popupAdd.open();
};

//Обработчик отправки формы редактирования профиля
function formEditSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  const { name, job } = popupEdit.getInputValues();
  user.setUserInfo(name, job);
  popupEdit.close();
};

//Обработчик добавления новой карточки
function formAddSubmitHandler (evt) {
  evt.preventDefault();
  const cardData = {
    name: placeInput.value,
    link: urlInput.value
  };
  cardsSection._renderer(cardData);
  formAddValidator.deactivateSaveButton(); //делаем кнопку неактивной
  popupAdd.close();
};

//Функция добавления карточки
function generateCard(cardData) {
  const card = new Card(
    cardData,
    '#cardTemplate',
    {
      handleCardClick: () => {
        popupCard.open(card._name, card._link);
      }
    }
  );

  return card.createCardElement();
};

//Функция инициализации первых 6ти карточек
function initCards() {
  cardsSection.clear();
  cardsSection.renderItems();
};




//Слушатель для кнопки редактировать профиль
buttonProfileEdit.addEventListener('click', openPopupEdit);

//Слушатель для кнопки добавить карточку
buttonProfileAdd.addEventListener('click', openPopupAdd);



//Создаем карточки по умолчанию
initCards();

//Создаем валидаторы для форм
const formEditValidator = new FormValidator(validateList, formEdit);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(validateList, formAdd);
formAddValidator.enableValidation();
