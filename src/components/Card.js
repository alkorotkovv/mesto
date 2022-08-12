//Класс карточки
export class Card {
  constructor(data, cardSelector, user, {handleCardClick, handleDeleteClick, handleLikeClick})
  {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._owner = data.owner;
    this._likes = data.likes;
    this._user = user;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._userLiked = data.likes.some(item => item._id === this._user._id);   //переменная хранит true - пользователь ставил лайк, false - не ставил
  };

  //Метод получения шаблона карточки
  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
  };

  //Метод, закрашивающий лайк, если пользователь есть в списках лайкнувших
  _initLike() {
    if (this._userLiked) this._cardLikeElement.classList.add('card__like_active');
  }

  //Метод переключатель-обновлятель лайков
  toggleLike(array) {
    this._cardCountElement.textContent = array.length;
    this._cardLikeElement.classList.toggle('card__like_active');
    this._userLiked = !this._userLiked;
  }

  //Метод, показывающий корзину, если карточка создана пользователем
  _initTrash() {
    if (this._user._id !== this._owner._id)
      this._cardDeleteElement.classList.add('card__delete_hidden');
  };

  //Метод удаления карточки
  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null; //очищаем ссылку на DOM элемент
  };

  //Метод, добавляющий слушатели
  _setEventListeners() {
    this._cardLikeElement.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick();
    });

    this._cardDeleteElement.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });
  };

  //Публичный метод создания элемента карточки
  createCardElement() {
    this._cardElement = this._getTemplate();
    this._cardImageElement = this._cardElement.querySelector('.card__image');
    this._cardNameElement = this._cardElement.querySelector('.card__title');
    this._cardLikeElement = this._cardElement.querySelector('.card__like');
    this._cardCountElement = this._cardElement.querySelector('.card__count');
    this._cardDeleteElement = this._cardElement.querySelector('.card__delete');
    this._cardNameElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = 'фотография ' + this._name;
    this._cardCountElement.textContent = this._likes.length;
    this._initTrash();
    this._initLike();
    this._setEventListeners();

    return this._cardElement;
  };

}
