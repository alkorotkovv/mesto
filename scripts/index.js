let page = document.querySelector('.page');
let popup = page.querySelector('.popup');
let formElement = popup.querySelector('.form-profile-edit');
let btnProfileEdit = page.querySelector('.profile__edit-button');
let btnPopupClose = popup.querySelector('.popup__close-button');

let nameProfile = page.querySelector('.profile__title');
let jobProfile = page.querySelector('.profile__subtitle');
let nameInput = formElement.querySelector('.form-profile-edit__input_content_name');
let jobInput = formElement.querySelector('.form-profile-edit__input_content_job');

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





//Создание карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let cards = page.querySelector('.elements__cards');

const cardsItem = document.createElement('li');
cardsItem.classList.add('card');
cards.append(cardsItem);

const cardsItemImage = document.createElement('img');
cardsItem.append(cardsItemImage);
cardsItemImage.classList.add('card__image');
cardsItemImage.src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg';
cardsItemImage.alt = 'фотография';

const cardsItemDescription = document.createElement('div');
cardsItemDescription.classList.add('card__description');
cardsItem.append(cardsItemDescription);

const cardsItemTitle = document.createElement('h2');
cardsItemDescription.append(cardsItemTitle);
cardsItemTitle.classList.add('card__title');
cardsItemTitle.textContent = "Название карточки";


const cardsItemLike = document.createElement('button');
cardsItemLike.classList.add('card__like');
cardsItemDescription.append(cardsItemLike);

