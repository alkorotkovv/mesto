export class Popup {
  constructor(popupSelector)
  {
    this._popupSelector = popupSelector;
  };

  open() {
    console.log("oooo")
    this._popupElement = document.querySelector(this._popupSelector);
    this.setEventListeners();
    this._popupElement.classList.add('popup_opened');

  };

  close() {
    this._popupElement.classList.remove('popup_opened');

  };

  _handleEscClose() {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (evt) => {
      //console.log(evt.target)
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });

  };





}
