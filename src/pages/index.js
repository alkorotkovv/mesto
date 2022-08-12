//Импорт стилей для сборки Вебпаком
import './index.css';

//Импорт необходимых данных
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithQuestion } from "../components/PopupWithQuestion.js";
import { Section } from "../components/Section.js";
import { Api } from "../components/Api.js";
import { formEdit, formAdd, formAvatar, buttonProfileEdit,
buttonProfileAdd, buttonAvatarEdit, nameInput, jobInput, validateList } from "../utils/constants.js";

//Создание необходимых экземпляров классов
const user = new UserInfo('.profile__title','.profile__subtitle', '.profile__image');
const popupEdit = new PopupWithForm('.popup_type_edit', handleSubmitFormEdit);
popupEdit.setEventListeners();
const popupAdd = new PopupWithForm('.popup_type_add', handleSubmitFormAdd);
popupAdd.setEventListeners();
const popupCard = new PopupWithImage('.popup_type_card');
popupCard.setEventListeners();
const popupDelete = new PopupWithQuestion('.popup_type_delete', handleSubmitFormDelete);
popupDelete.setEventListeners();
const popupAvatar = new PopupWithForm('.popup_type_avatar', handleSubmitFormAvatar);
popupAvatar.setEventListeners();

//Создаем валидаторы для форм
const formEditValidator = new FormValidator(validateList, formEdit);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(validateList, formAdd);
formAddValidator.enableValidation();
const formAvatarValidator = new FormValidator(validateList, formAvatar);
formAvatarValidator.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48/',
  headers: {
    authorization: '9c8b2d65-20ac-4a2a-9a38-45ba5cd9db7f',
    'Content-Type': 'application/json'
  }
});
const CardsSection = new Section(
  {
    items: {},
    renderer: (item) => {
      newCardsSection.addItem(generateCard(item));
    }
  },
  '.elements__cards'
);


//Функция открытия попапа редактирования аватара
function openPopupAvatar() {
  popupAvatar.open();
};

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

//Обработчик отправки формы редактирования аватара
function handleSubmitFormAvatar(inputValuesObject) {
  popupAvatar.renderLoading(true);
  api.setUserAvatar(inputValuesObject)
  .then(res => {
    user.setUserAvatar(res);
    popupAvatar.renderLoading(false);
    popupAvatar.close();
  })
  .catch(err => {
    console.log(err); // "Что-то пошло не так: ..."
  })
};

//Обработчик отправки формы редактирования профиля
function handleSubmitFormEdit(inputValuesObject) {
  popupEdit.renderLoading(true);
  api.setUserInfo(inputValuesObject)
  .then(res => {
    user.setUserInfo(res);
    popupEdit.renderLoading(false);
    popupEdit.close();
  })
  .catch(err => {
    console.log(err); // "Что-то пошло не так: ..."
  })
};

//Обработчик добавления новой карточки
function handleSubmitFormAdd(inputValuesObject) {
  popupAdd.renderLoading(true);
  api.addCard(inputValuesObject)
  .then(res => {
    CardsSection.addItem(generateCard(res));
    popupAdd.renderLoading(false);
    popupAdd.close();
    formAddValidator.deactivateSaveButton(); //делаем кнопку неактивной
  })
  .catch(err => {
    console.log(err); // "Что-то пошло не так: ..."
  })
};

//Обработчик удаления карточки в попапе
function handleSubmitFormDelete(card) {
  api.deleteCard(card)
  .then(res => {
    card.deleteCard();
    popupDelete.close();
  })
  .catch(err => {
    console.log(err); // "Что-то пошло не так: ..."
  })
};

//Функция генерирования карточки
function generateCard(cardData) {
  const card = new Card(
    cardData,
    '#cardTemplate',
    user.getUserInfo(),   //Передаем пользователя-создателя карточки
    {
      handleCardClick: () => {
        //popupCard.open(card._name, card._link);
        popupCard.open(card);
      },
      handleDeleteClick: () => {
        popupDelete.open(card);
      },
      handleLikeClick: () => {
        api.toggleLikeCard(card)
        .then(res => {
          card.toggleLike(res.likes);
        })
        .catch(err => {
          console.log(err); // "Что-то пошло не так: ..."
        })
      }
    }
  );
  return card.createCardElement();
};

//Функция инициализации первых карточек
function initCards() {
  api.getInitialCards()
  .then(res => {
    res.reverse();  //переворачиваем массив карточек, тк выводятся в обратном порядке
    CardsSection.clear();
    res.forEach((item) => {
      CardsSection.addItem(generateCard(item));
    })
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  })
};




//Слушатель для кнопки редактировать профиль
buttonProfileEdit.addEventListener('click', openPopupEdit);
//Слушатель для кнопки добавить карточку
buttonProfileAdd.addEventListener('click', openPopupAdd);
//Слушатель для кнопки редактировать аватар
buttonAvatarEdit.addEventListener('click', openPopupAvatar);



//Заполнение информации о юзере данными с сервера
api.getUserInfo()
.then(res => {
  user.setUserInfo(res);
  user.setUserAvatar(res);
  //Создаем карточки по умолчанию
  initCards();
})
.catch(err => {
  console.log(err); // "Что-то пошло не так: ..."
})




