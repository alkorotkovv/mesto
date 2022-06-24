//Блок объявления переменных
const page = document.querySelector('.page');

const popupEdit = page.querySelector('.popup_type_edit');
const popupAdd = page.querySelector('.popup_type_add');
const popupCard = page.querySelector('.popup_type_card');

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

const popupCardImage = popupCard.querySelector('.card-scale__image');
const popupCardCaption = popupCard.querySelector('.card-scale__caption');

const cardsList = page.querySelector('.elements__cards');
const cardTemplate = page.querySelector('#cardTemplate').content;


//Функция получения открытого попапа
function getOpenedPopup() {
  return page.querySelector('.popup_opened');
  //return item.closest('.popup_opened');
};

//Функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKeyPress);
  document.addEventListener('click', closePopupByClick);
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
  openedPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKeyPress);
  document.removeEventListener('click', closePopupByClick);
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
  nameInput.dispatchEvent(new Event('input'));  //делаем имитацию нажатия на клавишу чтобы сработал обработчик для валидации формы,
  //тк если оставить 1 символ в любом поле, закрыть и заново открыть попап ошибка остается висеть поскольку еще не было события input для полей формы и функции не вызываются
  jobInput.dispatchEvent(new Event('input'));  //делаем имитацию нажатия на клавишу чтобы сработал обработчик для валидации формы,
  //тк если оставить 1 символ в любом поле, закрыть и заново открыть попап ошибка остается висеть поскольку еще не было события input для полей формы и функции не вызываются
  openPopup(popupEdit);
};

//Функция открытия попапа добавления карточки
function openPopupAdd() {
  //placeInput.dispatchEvent(new Event('input'));
  //urlInput.dispatchEvent(new Event('input'));
  openPopup(popupAdd);
};

//Функция открытия попапа карточки
function openPopupCard(evt) {
  const btnCardImage = evt.target;
  popupCardImage.src = btnCardImage.closest('.card__image').src;
  popupCardImage.alt = 'попап ' + btnCardImage.closest('.card__image').alt;
  popupCardCaption.textContent = btnCardImage.nextElementSibling.firstElementChild.textContent;
  openPopup(popupCard);
};

//Функция для лайков
function likeCard(evt) {
  const btnCardLike = evt.target; //ловим элемент кнопку лайка
  btnCardLike.classList.toggle('card__like_active');
};

//Функция для удаления карточки
function deleteCard(evt) {
  const btnCardDelete = evt.target; //ловим элемент кнопку удаления карточки
  btnCardDelete.closest('.card').remove();
};

//Функция инициализации первых 6ти карточек
function initCards() {
  initialCards.forEach((item) => {addCard(item)});
};

//Функция создания карточки на основе i-того элемента массива
function createCard(item) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = 'фотография ' + item.name;
  cardElement.querySelector('.card__title').textContent = item.name;
  const btnCardLike = cardElement.querySelector('.card__like');
  btnCardLike.addEventListener('click', likeCard);
  const btnCardDelete = cardElement.querySelector('.card__delete');
  btnCardDelete.addEventListener('click', deleteCard);
  const btnCardImage = cardElement.querySelector('.card__image');
  btnCardImage.addEventListener('click', openPopupCard);
  //console.log(cardElement);
  return cardElement;
};

//Функция добавления i-той карточки в начало списка
function addCard(item) {
  cardsList.prepend(createCard(item));
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
  const btnAdd = evt.target.querySelector('.form__save-button');
  evt.preventDefault();
  const item = {
    name: placeInput.value,
    link: urlInput.value
  };
  //console.log(item);
  addCard(item);
  closePopup();
  formAdd.reset();  //Очищаем поля формы
  //делаем кнопку неактивной
  btnAdd.classList.add('form__save-button_disabled');
  btnAdd.disabled = true;
};



//Слушатель для кнопки редактировать профиль
btnProfileEdit.addEventListener('click', openPopupEdit);

//Слушатель для кнопки добавить карточку
btnProfileAdd.addEventListener('click', openPopupAdd);

//Добавляем слушатели на все кнопки закрытия попапа на странице
const btnsClosePopup = page.querySelectorAll('.popup__close-button');
btnsClosePopup.forEach((item) => {
  item.addEventListener('click', closePopup);
});

//Слушатель для кнопки сохранения формы редактирования профиля
formEdit.addEventListener('submit', formEditSubmitHandler);

//Слушатель для кнопки создания новой карточки
formAdd.addEventListener('submit', formAddSubmitHandler);



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
/*
initialCards.forEach(function (item, index) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = 'фотография ' + (index+1);
  cardElement.querySelector('.card__title').textContent = item.name;
  console.log(cardElement);
}
);
*/


//Создаем карточки по умолчанию
initCards();
