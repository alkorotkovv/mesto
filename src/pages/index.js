//Импорт стилей для сборки Вебпаком
import './index.css';

//Импорт необходимых данных
import { initialCards, validateList } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { Api } from "../components/Api.js";
import { formEdit, formAdd, buttonProfileEdit,
buttonProfileAdd, nameInput, jobInput } from "../utils/constants.js";


//Создание необходимых экземпляров классов
/*
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsSection.addItem(generateCard(item));
    }
  },
  '.elements__cards'
);
*/
const user = new UserInfo('.profile__title','.profile__subtitle');
const popupEdit = new PopupWithForm('.popup_type_edit', handleSubmitFormEdit);
popupEdit.setEventListeners();
const popupAdd = new PopupWithForm('.popup_type_add', handleSubmitFormAdd);
popupAdd.setEventListeners();
const popupCard = new PopupWithImage('.popup_type_card');
popupCard.setEventListeners();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48/',
  headers: {
    authorization: '9c8b2d65-20ac-4a2a-9a38-45ba5cd9db7f',
    'Content-Type': 'application/json'
  }
});








//Функция открытия попапа редактирования профиля
function openPopupEdit() {
  const { name, job } = user.getUserInfo(); //деструктуризация
  nameInput.value = name;  //заполняем поля ввода данными из профиля
  jobInput.value = job;
  formEditValidator.hideErrors();  //скрываем ошибки при открытии
  formEditValidator.activateSaveButton();  //активируем кнопку при открытии
  popupEdit.open();
};

//Функция открытия попапа добавления карточки
function openPopupAdd() {
  popupAdd.open();
};

//Обработчик отправки формы редактирования профиля
function handleSubmitFormEdit (inputValuesObject) {
  //const { name, job } = inputValuesObject;
  //user.setUserInfo({name: name, job: job});
  user.setUserInfo(inputValuesObject);
  popupEdit.close();
};

//Обработчик добавления новой карточки
function handleSubmitFormAdd (inputValuesObject) {
  const { place, url } = inputValuesObject;
  cardsSection.addItem(generateCard({name: place, link: url}));
  //cardsSection.addItem(generateCard({name: place, link: url}));
  formAddValidator.deactivateSaveButton(); //делаем кнопку неактивной
  popupAdd.close();
};

//Функция генерирования карточки
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

//Функция инициализации первых карточек
function initCards() {
  api.getInitialCards().then(res => {
    //console.log(res);
    const cardsSection = new Section(
      {
        items: res,
        renderer: (item) => {
          cardsSection.addItem(generateCard(item));
        }
      },
      '.elements__cards'
    );
    //console.log(cardsSectionNew);
    cardsSection.clear();
    cardsSection.renderItems();
    }
  );
};




//Слушатель для кнопки редактировать профиль
buttonProfileEdit.addEventListener('click', openPopupEdit);

//Слушатель для кнопки добавить карточку
buttonProfileAdd.addEventListener('click', openPopupAdd);




//Заполнение информации о юзере данными с сервера
api.getUserInfo().then(res => {
  user.setUserInfo(res);
  }
);

//Создаем карточки по умолчанию
initCards();

//Создаем валидаторы для форм
const formEditValidator = new FormValidator(validateList, formEdit);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(validateList, formAdd);
formAddValidator.enableValidation();
