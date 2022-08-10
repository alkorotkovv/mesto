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
  open(cardID) {
    super.open();
    console.log("попап открылся");
    console.log(cardID)
    this._cardID = cardID;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      console.log("да")
      evt.preventDefault(); //отменяем стандартную отправку формы
      this._formSubmitHandler(this._cardID);
    });
  };

}
