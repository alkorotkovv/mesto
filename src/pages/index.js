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
import { formEdit, formAdd, buttonProfileEdit,
buttonProfileAdd, nameInput, jobInput,
placeInput, urlInput} from "../utils/constants.js";

//Создание необходимых экземпляров классов
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
const popupCard = new PopupWithImage('.popup_type_card');



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
function formEditSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  const { name, job } = popupEdit.getInputValues(); //деструктуризация
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
