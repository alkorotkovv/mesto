import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {






  open() {
    console.log("opennnnn")
    this._popupElement = document.querySelector(this._popupSelector);
    this.setEventListeners();
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popupElement.classList.add('popup_opened');
  };

}
