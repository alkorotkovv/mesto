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


//Функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
};

//Функция открытия попапа редактирования профиля
function openPopupEdit() {
  nameInput.value = nameProfile.textContent;  //заполняем поля ввода данными из профиля
  jobInput.value = jobProfile.textContent;
  nameInput.dispatchEvent(new Event('input'));  //делаем имитацию нажатия на клавишу чтобы сработал обработчик для валидации формы,
  //тк если оставить 1 символ в любом поле, закрыть и заново открыть попап ошибка остается висеть поскольку еще не было события input для полей формы и функции не вызываются
  openPopup(popupEdit);
};

//Функция открытия попапа добавления карточки
function openPopupAdd() {
  //placeInput.value = '';  //обнуляем поля ввода если там что то есть (перенесено в Обработчик добавления новой карточки)
  //urlInput.value = '';
  openPopup(popupAdd);
};

//Функция открытия попапа карточки
function openPopupCard(evt) {
  const btnCardImage = evt.target;
  //console.log(btnCardImage.closest('.card__image').src);
  //console.log(btnCardImage.nextElementSibling.firstElementChild.textContent);
  popupCardImage.src = btnCardImage.closest('.card__image').src;
  popupCardImage.alt = 'попап ' + btnCardImage.closest('.card__image').alt;
  popupCardCaption.textContent = btnCardImage.nextElementSibling.firstElementChild.textContent;
  openPopup(popupCard);
};

//Функция закрытия любого попапа
function closePopup(evt) {
  const targetItem = evt.target; //ловим элемент по которому сработало событие закрытия попапа
  //console.log(targetItem);
  targetItem.closest('.popup_opened').classList.remove('popup_opened');
};

//Функция для лайков
function likeCard(evt) {
  const btnCardLike = evt.target; //ловим элемент кнопку лайка
  //console.log(btnCardLike);
  btnCardLike.classList.toggle('card__like_active');
};

//Функция для удаления карточки
function deleteCard(evt) {
  const btnCardDelete = evt.target; //ловим элемент кнопку удаления карточки
  btnCardDelete.closest('.card').remove();
};

//Функция создания карточек по умолчанию
function initCards() {
  for (let i=0; i<initialCards.length; i++)
  {
    addCard(i);
  }
};

/*
function initCardss() {
  initialCards.forEach((item, index) => {addCard(index);});
};
*/


//Функция создания карточки на основе i-того элемента массива
function createCard(i) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = initialCards[i].link;
  cardElement.querySelector('.card__image').alt = 'фотография ' + (i+1);
  cardElement.querySelector('.card__title').textContent = initialCards[i].name;
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
function addCard(i) {
  cardsList.prepend(createCard(i));
};

//Обработчик отправки формы редактирования профиля
function formEditSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(evt);
};

//Обработчик добавления новой карточки
function formAddSubmitHandler (evt) {
  evt.preventDefault();
  initialCards.unshift( //Вставляем в начало массива данные из формы
  {
    name: placeInput.value,
    link: urlInput.value
  });
  //console.log(initialCards);
  addCard(0);
  closePopup(evt);
  formAdd.reset();  //Очищаем поля формы
};



//Слушатель для кнопки редактировать профиль
btnProfileEdit.addEventListener('click', openPopupEdit);

//Слушатель для кнопки добавить карточку
btnProfileAdd.addEventListener('click', openPopupAdd);

//Добавляем слушатели на все кнопки закрытия попапа на странице
const btnsClosePopup = page.querySelectorAll('.popup__close-button');
btnsClosePopup.forEach((item) => {
  //console.log(item);
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
