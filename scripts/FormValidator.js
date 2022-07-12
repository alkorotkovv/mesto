//Класс валидатора формы
export class FormValidator {
  constructor(toValidateSelectors, toValidateFormElement) {
    this._toValidateSelectors = toValidateSelectors;
    this._toValidateForm = toValidateFormElement;
  }

  enableValidation() {
    //создадим объект формы для удобства (передачи его как аргумента)
    const formObject = {
      form: this._toValidateForm,
      inputList: Array.from(this._toValidateForm.querySelectorAll(this._toValidateSelectors.inputSelector)),
      inputErrorClass: this._toValidateSelectors.inputErrorClass,
      saveButton:
      {
        buttonElement: this._toValidateForm.querySelector(this._toValidateSelectors.submitButtonSelector),
        inactiveButtonClass: this._toValidateSelectors.inactiveButtonClass
      }
      //formErrorClass: toValidateList.errorClass
    };

    this._checkFormValidity(formObject);

  };

  _checkFormValidity = (formObject) => {

    formObject.inputList.forEach((inputElement, index) => {
      //создадим объект инпута для удобства (передачи его как аргумента)
      const inputObject = {
        input: inputElement,
        inputErrorClass: formObject.inputErrorClass,
        errorSpan: formObject.form.querySelector(`.${inputElement.id}-error`)
      };
      //добавляем слушатели на все инпуты по событию 'ввод'
      inputElement.addEventListener('input', () => {
        //console.log('случился ввод');
        this._checkInputValidity(inputObject);
        this._toggleSaveButtonState(formObject);
      });
    });
  };

  _checkInputValidity = (inputObject) => {

    if (!this._isInputValid(inputObject)) {
      //console.log('инпут не валидный');
      this._showInputError(inputObject);
    } else {
      //console.log('инпут валидный');
      this._hideInputError(inputObject);
    };
  };

  _toggleSaveButtonState(formObject) {
    if (this._hasInvalidInput(formObject))
      this._deactivateButton(formObject.saveButton);
    else
      this._activateButton(formObject.saveButton);
  };

  _activateButton(buttonObject) {
    buttonObject.buttonElement.classList.remove(buttonObject.inactiveButtonClass);
    buttonObject.buttonElement.disabled = false;
  };

  _deactivateButton(buttonObject) {
    buttonObject.buttonElement.classList.add(buttonObject.inactiveButtonClass);
    buttonObject.buttonElement.disabled = true;
  };

  //Функция проверки существования невалидного инпута на всей форме
  _hasInvalidInput(formObject) {
    //console.log('проверяем все инпуты');
    //formObject.inputList.forEach((inputElement) => {console.log(inputElement.validity);});
    return formObject.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //Функция проверки конкретного инпута на валидность
  _isInputValid(inputObject) {
    return (inputObject.input.validity.valid);
  };

  //Функция отображения ошибки при невалидном инпуте
  _showInputError = (inputObject) => {
    inputObject.input.classList.add(inputObject.inputErrorClass);
    inputObject.errorSpan.textContent = inputObject.input.validationMessage;
  };

  //Функция скрытия ошибки при валидном инпуте
  _hideInputError = (inputObject) => {
    inputObject.input.classList.remove(inputObject.inputErrorClass);
    inputObject.errorSpan.textContent = '';
  };

}




