//Класс валидатора формы
export class FormValidator {
  constructor(validateSelectors, validateFormElement)
  {
    this._inputList = Array.from(validateFormElement.querySelectorAll(validateSelectors.inputSelector));
    this._saveButton = validateFormElement.querySelector(validateSelectors.submitButtonSelector);
    this._inactiveButtonClass = validateSelectors.inactiveButtonClass;
    this._inputErrorClass = validateSelectors.inputErrorClass;
    this._validateForm = validateFormElement;
  };

  //Публичный метод, включает валидацию формы
  enableValidation() {
    this._checkFormValidity();
  };

  //Приватный метод, валидация формы
  _checkFormValidity() {
    this._inputList.forEach((inputElement) => {
      //создадим объект инпута для удобства (передачи его как аргумента)
      const inputObject = {
        input: inputElement,
        errorSpan: this._validateForm.querySelector(`.${inputElement.id}-error`)
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
  _checkInputValidity(inputObject) {
    if (!this._isInputValid(inputObject)) {
      //console.log('инпут не валидный');
      this._showInputError(inputObject);
    }
    else {
      //console.log('инпут валидный');
      this._hideInputError(inputObject);
    };
  };

  //Метод для переключения активности кнопки сабмита
  _toggleSaveButtonState() {
    if (this._hasInvalidInput())
      this.deactivateSaveButton();
    else
      this.activateSaveButton();
  };

  //Метод для активации произвольной кнопки
  activateSaveButton() {
    this._saveButton.classList.remove(this._inactiveButtonClass);
    this._saveButton.disabled = false;
  };

  //Метод для деактивации произвольной кнопки
  deactivateSaveButton() {
    this._saveButton.classList.add(this._inactiveButtonClass);
    this._saveButton.disabled = true;
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
  _showInputError(inputObject) {
    inputObject.input.classList.add(this._inputErrorClass);
    inputObject.errorSpan.textContent = inputObject.input.validationMessage;
  };

  //Метод для скрытия ошибки при валидном инпуте
  _hideInputError(inputObject) {
    inputObject.input.classList.remove(this._inputErrorClass);
    inputObject.errorSpan.textContent = '';
  };

  //Публичный метод для скрытия ошибок (используется в index.js)
  hideErrors() {
    this._inputList.forEach((inputElement) => {
      //создадим объект инпута для удобства (передачи его как аргумента)
      const inputObject = {
        input: inputElement,
        errorSpan: this._validateForm.querySelector(`.${inputElement.id}-error`)
      };
      this._hideInputError(inputObject);
    });
  };

}




