import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler)
  {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popupElement.querySelector('.form');
  };

  //Метод, возвращающий объект со значениями инпутов
  getInputValues() {
    const object = {};
    this._inputs = Array.from(this._form.querySelectorAll('.form__input'));
    //console.log(this._inputs);
    this._inputs.forEach((input) => object[input.name] = input.value);
    return object;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', this._formSubmitHandler);
    //console.log(this._popupElement)
  };

  close() {
    super.close();
    this._form.reset();  //Очищаем поля формы
  };

}
