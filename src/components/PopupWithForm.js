import { Popup } from "./Popup.js";

//Класс-наследник попап с формой
export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler)
  {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popupElement.querySelector('.form');
    this._inputs = Array.from(this._form.querySelectorAll('.form__input'));
    this._originalSubmitText = this._popupElement.querySelector('.form__save-button').textContent;
  };

  //Метод, возвращающий объект со значениями инпутов
  _getInputValues() {
    const object = {};
    this._inputs.forEach((input) => object[input.name] = input.value);
    return object;
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
      this._popupElement.querySelector('.form__save-button').textContent = "Сохранение...";
    else
      this._popupElement.querySelector('.form__save-button').textContent = this._originalSubmitText;
  }

}
