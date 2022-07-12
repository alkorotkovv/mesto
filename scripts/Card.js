import {openPopup} from './index.js';

const cardsList = document.querySelector('.elements__cards');
const popupCard = document.querySelector('.popup_type_card');
const popupCardImage = popupCard.querySelector('.card-scale__image');
const popupCardCaption = popupCard.querySelector('.card-scale__caption');


//Класс карточки
export class Card {
  constructor(data, cardSelector)
  {
    this._name = data.name;
    this._link = data.link;
    this._isLiked = false;
    this._cardSelector = cardSelector;
  };

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardTemplate;
  };

  _like() {
    this._btnCardLike.classList.toggle('card__like_active');
    this._isLiked = !this._isLiked;
  };

  _openPopupCard() {
    popupCardImage.src = this._link;
    popupCardImage.alt = 'попап ' + this._name;
    popupCardCaption.textContent = this._name;
    openPopup(popupCard);
  };

  _deleteCard() {
    this._cardElement.remove();
  };

  _setEventListeners() {
    this._btnCardLike = this._cardElement.querySelector('.card__like');
    this._btnCardLike.addEventListener('click', () => {
      this._like();
    });

    this._btnCardImage = this._cardElement.querySelector('.card__image');
    this._btnCardImage.addEventListener('click', () => {
      this._openPopupCard();
    });

    this._btnCardDelete = this._cardElement.querySelector('.card__delete');
    this._btnCardDelete.addEventListener('click', () => {
      this._deleteCard();
    });
  };


  create() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._cardElement.querySelector('.card__image').src = this._link;
    this._cardElement.querySelector('.card__image').alt = 'фотография ' + this._name;
    this._setEventListeners();
    //console.log(this._cardElement)
    return this._cardElement;
  };

}

/*
const card = new Card(initialCards[1], '#cardTemplate');
const cardElement = card.create();
cardsList.append(cardElement);
*/
