//Импорт необходимых данных
import { initialCards, validateList } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { UserInfo } from "./UserInfo.js";
import { Popup } from "./Popup.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";

//Блок объявления переменных
const page = document.querySelector('.page');

const popupList = page.querySelectorAll('.popup');
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

const cardsList = document.querySelector('.elements__cards');

const initSection = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        initSection.addItem(generateCard(item));
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
/*
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

/*
//Функция закрытия попапа на нажатие ESC
function closePopupByKeyPress(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = getOpenedPopup();
    console.log(openedPopup)
    //openedPopup.close();
    closePopup(openedPopup);
  }
};

/*
//Функция закрытия попапа на клик по оверлэю
function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    const openedPopup = evt.target;
    closePopup(openedPopup);
  }
};
*/

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

  initSection._renderer(cardData);

  //insertCard(generateCard(cardData));
  //formAdd.reset();  //Очищаем поля формы
  formAddValidator.deactivateSaveButton(); //делаем кнопку неактивной
  popupAdd.close();
};

//Функция добавления карточки
function generateCard(cardData) {
  const card = new Card(
    cardData,
    '#cardTemplate',
    {
      handleCardClick: (card) => {
        console.log(card);
        popupCard.open();
      }
    }
  );


  return card.createCardElement();
};

/*
const initSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      initSection.addItem(generateCard(item));
    }
  },
  '.elements__cards'
);
*/













//Функция инициализации первых 6ти карточек
function initCards() {
  initSection.clear();
  initSection.renderItems();
};






//Слушатель для кнопки редактировать профиль
buttonProfileEdit.addEventListener('click', openPopupEdit);

//Слушатель для кнопки добавить карточку
buttonProfileAdd.addEventListener('click', openPopupAdd);

/*
//Добавляем слушатели на все кнопки закрытия попапа на странице
const buttonClosePopupList = page.querySelectorAll('.popup__close-button');
buttonClosePopupList.forEach((buttonElement) => {
  buttonElement.addEventListener('click', (evt) => {
    const openedPopup = evt.target.closest('.popup_opened');
    closePopup(openedPopup);
  });
});
*/










//Слушатель для кнопки сохранения формы редактирования профиля
//formEdit.addEventListener('submit', formEditSubmitHandler);

//Слушатель для кнопки создания новой карточки в попапе
//formAdd.addEventListener('submit', formAddSubmitHandler);

/*
//Добавляем слушатели на все попапы (для закрытия попапа кликом на оверлей или крестик)
popupList.forEach((popupItem)=>{
  popupItem.addEventListener('click', (evt) => {
    //console.log(evt.target)
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popupItem)
    }
  });
});

*/


//Создаем карточки по умолчанию
initCards();

//Создаем валидаторы для форм
const formEditValidator = new FormValidator(validateList, formEdit);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(validateList, formAdd);
formAddValidator.enableValidation();
