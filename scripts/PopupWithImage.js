import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector)
  {
    super(popupSelector);
    this._popupCardImage = this._popupElement.querySelector('.card-scale__image');
    this._popupCardCaption = this._popupElement.querySelector('.card-scale__caption');
  };

  open() {
    super.open();
    console.log("ffff" + this);
    //this._popupCardImage.src = this._link;
    //this._popupCardImage.alt = 'попап ' + this._name;
    //this._popupCardCaption.textContent = this._name;
  };

}
