//Класс карточки
export class Card {
  constructor(data, cardSelector, username, {handleCardClick, handleDeleteClick})
  {
    console.log(data);
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._owner = data.owner;
    this._username = username;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  };

  //Метод получения шаблона карточки
  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
  };

  //Метод лайка
  _like() {
    this._cardLikeElement.classList.toggle('card__like_active');
  };

  _toggleDeleteIcon() {
    console.log(this._owner);
    if (this._username !== this._owner.name)
      this._cardDeleteElement.classList.add('card__delete_hidden');
  };

  /*
  //Метод открытия попапа карточки
  _openPopupCard() {
    popupCard.open(this._name, this._link);
  };
  */


  //Метод удаления карточки
  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null; //очищаем ссылку на DOM элемент
  };

  //Метод, добавляющий слушатели
  _setEventListeners() {
    this._cardLikeElement.addEventListener('click', () => {
      this._like();
    });

    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick();
    });

    this._cardDeleteElement.addEventListener('click', () => {
      //this._deleteCard();
      this._handleDeleteClick(this._id);
    });
  };

  //Публичный метод создания элемента карточки
  createCardElement() {
    this._cardElement = this._getTemplate();
    this._cardImageElement = this._cardElement.querySelector('.card__image');
    this._cardNameElement = this._cardElement.querySelector('.card__title');
    this._cardLikeElement = this._cardElement.querySelector('.card__like');
    this._cardDeleteElement = this._cardElement.querySelector('.card__delete');

    this._cardNameElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = 'фотография ' + this._name;
    //this._toggleDeleteIcon();
    this._setEventListeners();

    //console.log(this._cardElement)
    return this._cardElement;
  };

}
