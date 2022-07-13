//Класс валидатора формы
export class FormValidator {
  constructor(toValidateSelectors, toValidateFormElement)
  {
    this._inputList = Array.from(toValidateFormElement.querySelectorAll(toValidateSelectors.inputSelector));
    this._saveButton = toValidateFormElement.querySelector(toValidateSelectors.submitButtonSelector);
    this._inactiveButtonClass = toValidateSelectors.inactiveButtonClass;
    this._inputErrorClass = toValidateSelectors.inputErrorClass;
    this._toValidateForm = toValidateFormElement;
  }

  //Публичный метод, включает валидацию формы
  enableValidation() {
    this._checkFormValidity();
  };

  //Приватный метод, валидация формы
  _checkFormValidity = () => {
    this._inputList.forEach((inputElement) => {
      //создадим объект инпута для удобства (передачи его как аргумента)
      const inputObject = {
        input: inputElement,
        errorSpan: this._toValidateForm.querySelector(`.${inputElement.id}-error`)
      };
      //добавляем слушатели на все инпуты по событию 'ввод'
      inputElement.addEventListener('input', () => {
        //console.log('произошёл ввод');
        this._checkInputValidity(inputObject);
        this._toggleSaveButtonState();
      });
    });
  };

  //Метод-реакция на валидность конкретного инпута
  _checkInputValidity = (inputObject) => {
    if (!this._isInputValid(inputObject)) {
      //console.log('инпут не валидный');
      this._showInputError(inputObject);
    } else {
      //console.log('инпут валидный');
      this.hideInputError(inputObject);
    };
  };

  //Метод для переключения активности кнопки сабмита
  _toggleSaveButtonState() {
    if (this._hasInvalidInput())
      this.deactivateButton(this._saveButton);
    else
      this.activateButton(this._saveButton);
  };

  //Метод для активации произвольной кнопки
  activateButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  };

  //Метод для деактивации произвольной кнопки
  deactivateButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  };

  //Метод проверки существования невалидного инпута на всей форме
  _hasInvalidInput() {
    //console.log('проверяем все инпуты');
    //formObject.inputList.forEach((inputElement) => {console.log(inputElement.validity);});
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //Метод проверки конкретного инпута на валидность
  _isInputValid(inputObject) {
    return (inputObject.input.validity.valid);
  };

  //Метод для отображения ошибки при невалидном инпуте
  _showInputError = (inputObject) => {
    inputObject.input.classList.add(this._inputErrorClass);
    inputObject.errorSpan.textContent = inputObject.input.validationMessage;
  };

  //Метод для скрытия ошибки при валидном инпуте
  hideInputError = (inputObject) => {
    inputObject.input.classList.remove(this._inputErrorClass);
    inputObject.errorSpan.textContent = '';
  };

}




