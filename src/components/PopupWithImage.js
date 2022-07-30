import { Popup } from "./Popup.js";

//Класс-наследник попап с картинкой
export class PopupWithImage extends Popup {
  constructor(popupSelector)
  {
    super(popupSelector);
    this._popupCardImage = this._popupElement.querySelector('.card-scale__image');
    this._popupCardCaption = this._popupElement.querySelector('.card-scale__caption');
  };

  //Метод открытия попапа с заполнением ссылки и подписи
  open(name, link) {
    super.open();
    this._popupCardImage.src = link;
    this._popupCardImage.alt = 'попап ' + name;
    this._popupCardCaption.textContent = name;
  };

}
