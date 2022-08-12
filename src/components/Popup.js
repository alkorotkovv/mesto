//Класс попапа
export class Popup {
  constructor(popupSelector)
  {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  //Метод открытия попапа
  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.classList.add('popup_opened');
  };

  //Метод закрытия попапа
  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.classList.remove('popup_opened');
  };

  //Метод закрытия попапа нажатием на Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape')
      this.close();
  };

  //Метод установки слушателей
  setEventListeners() {
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button'))
        this.close();
    });
  };




}
