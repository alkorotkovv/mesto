//Класс карточки
export class Card {
  constructor(data, cardSelector, user, {handleCardClick, handleDeleteClick, handleLikeClick})
  {
    //console.log(data);
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._owner = data.owner;
    this._user = user;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._userLiked = this._likes.some(item => item.name === this._user.name);
  };

  //Метод получения шаблона карточки
  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
  };

  /*
  //Метод лайка
  _like() {
    console.log("вызывали лайк" );
    this._cardLikeElement.classList.toggle('card__like_active');

      //item.name === this.user.name}))
      //this._cardLikeElement.classList.toggle('card__like_active');

  };
*/

  _paintLike() {
    if (this._userLiked) this._cardLikeElement.classList.add('card__like_active');
  }

  _toggleLike(array) {
    this._cardCountElement.textContent = array.length;
    this._cardLikeElement.classList.toggle('card__like_active');
    this._userLiked = !this._userLiked;
  }

  //Метод проверяющий принадлежность карточки текущему пользователю
  _toggleDeleteIcon() {
    if (this._user.name !== this._owner.name)
      this._cardDeleteElement.classList.add('card__delete_hidden');
  };

  //Метод удаления карточки
  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null; //очищаем ссылку на DOM элемент
  };

  //Метод, добавляющий слушатели
  _setEventListeners() {
    this._cardLikeElement.addEventListener('click', () => {
      //this._like();
      this._handleLikeClick(this._userLiked);
    });

    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick();
    });

    this._cardDeleteElement.addEventListener('click', () => {
      //this._deleteCard();
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

    this._cardCountElement.textContent = this._likes.length;
    this._cardNameElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = 'фотография ' + this._name;
    //this._toggleLikes(this._likes);
    this._toggleDeleteIcon();
    this._paintLike();
    this._setEventListeners();

    return this._cardElement;
  };

}
