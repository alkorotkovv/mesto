import { Popup } from "./Popup.js";

//Класс-наследник попап с формой
export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler)
  {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popupElement.querySelector('.form');
    this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
    this._buttonSave = this._popupElement.querySelector('.form__save-button');
    this._originalSubmitText = this._buttonSave.textContent;
  };

  //Метод, возвращающий объект со значениями инпутов
  _getInputValues() {
    const object = {};
    this._inputList.forEach((input) => object[input.name] = input.value);
    return object;
  };

  //Метод заполняющий инпуты данными из объекта по атрибуту `name` этих инпутов
  setInputValues(data) {
    this._inputList.forEach((input) => input.value = data[input.name]);
  };

  //Метод устанавливающий слушатели
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault(); //отменяем стандартную отправку формы
      this._formSubmitHandler(this._getInputValues());
    });
  };

  //Метод закрытия попапа
  close() {
    super.close();
    this._form.reset();  //Очищаем поля формы
  };

  //Метод для визуального отображения процесса загрузки во время обмена данных с сервером
  renderLoading(isLoading) {
    if(isLoading)
      this._buttonSave.textContent = "Сохранение...";
    else
      this._buttonSave.textContent = this._originalSubmitText;
  }

}
