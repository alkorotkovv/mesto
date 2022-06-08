let page = document.querySelector('.page');

let popupEdit = page.querySelector('.popup_edit');
let formElement = popupEdit.querySelector('.form_profile_edit');
let btnProfileEdit = page.querySelector('.profile__edit-button');

let nameProfile = page.querySelector('.profile__title');
let jobProfile = page.querySelector('.profile__subtitle');
let nameInput = formElement.querySelector('.form__input_content_name');
let jobInput = formElement.querySelector('.form__input_content_job');

//Добавляем слушатели на все кнопки закрытия попапа на странице
const btnsClosePopup = page.querySelectorAll('.popup__close-button');
btnsClosePopup.forEach((item) => {
  //console.log(item);
  item.addEventListener('click', closePopup);
});

//Функция закрытия попапа
function closePopup(evt) {
  const btnClosePopup = evt.target; //ловим элемент кнопку закрытия попапа
  //console.log(btnClosePopup);
  btnClosePopup.closest('.popup_opened').classList.remove('popup_opened');
};

//Функция открытия попапа редактирования профиля
function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
};

//Слушатели для кнопки открыть попапа редактирования профиля
btnProfileEdit.addEventListener('click', openPopupEdit);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(evt);
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);





//Создание карточек по умолчанию
let cards = page.querySelector('.elements__cards');

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

function createCard(i) {
  const cardTemplate = document.querySelector('#cardTemplate').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = initialCards[i].link;
  cardElement.querySelector('.card__title').textContent = initialCards[i].name;
  const btnCardLike = cardElement.querySelector('.card__like');
  btnCardLike.addEventListener('click', likeCard);
  const btnCardDelete = cardElement.querySelector('.card__delete');
  btnCardDelete.addEventListener('click', deleteCard);
  const btnCardImage = cardElement.querySelector('.card__image');
  btnCardImage.addEventListener('click', openPopupCard);
  cards.prepend(cardElement);
}

for (let i=0; i<initialCards.length; i+=1)
{
  createCard(i);
}


/*
for (let i=0; i<initialCards.length; i+=1)
{
  const cardsItem = document.createElement('li');
  cardsItem.classList.add('card');
  cards.append(cardsItem);

  const cardsItemImage = document.createElement('img');
  cardsItem.append(cardsItemImage);
  cardsItemImage.classList.add('card__image');
  cardsItemImage.src = initialCards[i].link;
  cardsItemImage.alt = 'фотография';

  const cardsItemDescription = document.createElement('div');
  cardsItemDescription.classList.add('card__description');
  cardsItem.append(cardsItemDescription);

  const cardsItemTitle = document.createElement('h2');
  cardsItemDescription.append(cardsItemTitle);
  cardsItemTitle.classList.add('card__title');
  cardsItemTitle.textContent = initialCards[i].name;


  const cardsItemLike = document.createElement('button');
  cardsItemLike.classList.add('card__like');
  cardsItemDescription.append(cardsItemLike);
};
*/


let popupAdd = page.querySelector('.popup_add');
let formCardAdd = popupAdd.querySelector('.form_card_add');
let btnProfileAdd = page.querySelector('.profile__add-button');

let placeInput = formCardAdd.querySelector('.form__input_content_place');
let urlInput = formCardAdd.querySelector('.form__input_content_url');

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
  placeInput.value = '';
  urlInput.value = '';
};

btnProfileAdd.addEventListener('click', openPopupAdd);


//Добавление новых карточек
function formAddCardSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  initialCards.unshift(
  {
    name: placeInput.value,
    link: urlInput.value
  });
  //console.log(initialCards);
  createCard(0);
  closePopup(evt);
};

//Слушатель для кнопки Сохранить
formCardAdd.addEventListener('submit', formAddCardSubmitHandler);


//Функция для лайков
function likeCard(evt) {
  const btnCardLike = evt.target; //ловим элемент кнопку лайка
  btnCardLike.closest('.card__like').classList.toggle('card__like_active');
};

//Функция для удаления карточки
function deleteCard(evt) {
  const btnCardDelete = evt.target; //ловим элемент кнопку удаления карточки
  btnCardDelete.closest('.card').remove();
};


let popupCard = page.querySelector('.popup_card');
let popupCardImage = popupCard.querySelector('.card-scale__image');
let popupCardCaption = popupCard.querySelector('.card-scale__caption');
//Функция открытия попапа карточки
function openPopupCard(evt) {
  const btnCardImage = evt.target;
  //console.log(btnCardImage.closest('.card__image').src);
  //console.log(btnCardImage.nextElementSibling.firstElementChild.textContent);
  popupCardImage.src = btnCardImage.closest('.card__image').src;
  popupCardCaption.textContent = btnCardImage.nextElementSibling.firstElementChild.textContent;
  popupCard.classList.add('popup_opened');
};
