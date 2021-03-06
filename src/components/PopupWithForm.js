import { Popup } from "./Popup.js";

//Класс-наследник попап с формой
export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler)
  {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popupElement.querySelector('.form');
    this._inputs = Array.from(this._form.querySelectorAll('.form__input'));
  };

  //Метод, возвращающий объект со значениями инпутов
  _getInputValues() {
    const object = {};
    this._inputs.forEach((input) => object[input.name] = input.value);
    return object;
  };


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault(); //отменяем стандартную отправку формы
      this._formSubmitHandler(this._getInputValues());
    });
  };

  close() {
    super.close();
    this._form.reset();  //Очищаем поля формы
  };

}
