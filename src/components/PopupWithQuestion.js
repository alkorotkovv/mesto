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
    console.log("попап открылся");
    console.log(card);
    //console.log(card._cardElement);
    this._card = card;
    this._cardID = card._id;
    this._cardElement = card._cardElement;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      console.log("да")
      evt.preventDefault(); //отменяем стандартную отправку формы
      this._formSubmitHandler(this._card);
    });
  };

}
