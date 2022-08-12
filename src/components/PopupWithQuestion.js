import { Popup } from "./Popup.js";

//Класс-наследник попап с картинкой
export class PopupWithQuestion extends Popup {
  constructor(popupSelector, formSubmitHandler)
  {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popupElement.querySelector('.form');
  };

  //Метод открытия попапа с заполнением ссылки и подписи
  open(card) {
    super.open();
    this._card = card;
  };

  //Метод устанавливающий слушатели
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault(); //отменяем стандартную отправку формы
      this._formSubmitHandler(this._card);
    });
  };

}
