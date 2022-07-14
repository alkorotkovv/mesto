//Импорт необходимых данных
import {openPopup, popupCard, popupCardImage, popupCardCaption} from './index.js';

//Класс карточки
export class Card {
  constructor(data, cardSelector)
  {
    this._name = data.name;
    this._link = data.link;
    this._isLiked = false;
    this._cardSelector = cardSelector;
  };


  //Метод получения шаблона карточки
  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
  };


  //Метод лайка
  _like() {
    this._cardLikeElement.classList.toggle('card__like_active');
    this._isLiked = !this._isLiked;
  };

  //Метод открытия попапа карточки
  _openPopupCard() {
    popupCardImage.src = this._link;
    popupCardImage.alt = 'попап ' + this._name;
    popupCardCaption.textContent = this._name;
    openPopup(popupCard);
  };

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
      this._openPopupCard();
    });

    this._cardDeleteElement.addEventListener('click', () => {
      this._deleteCard();
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
    this._setEventListeners();
    //console.log(this._cardElement)
    return this._cardElement;
  };

}
