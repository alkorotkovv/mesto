export class Popup {
  constructor(popupSelector)
  {
    this._popupSelector = popupSelector;
  };

  open() {
    console.log("opennnnn")
    this._popupElement = document.querySelector(this._popupSelector);
    this.setEventListeners();
    this._popupElement.classList.add('popup_opened');

  };

  close() {
    console.log("close");
    this._popupElement.classList.remove('popup_opened');

  };

  _handleEscClose(evt) {
    console.log("esccccc")
    if (evt.key === 'Escape') {
      console.log(this._popupElement);
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (evt) => {
      console.log("clicccc")
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });

    document.addEventListener('keydown', this._handleEscClose.bind(this));

  };




}