function enableValidation(toValidateList) {
  //console.log(toValidateList);
  const formList = Array.from(document.querySelectorAll(toValidateList.formSelector));

  formList.forEach((formElement, index) => {
    //formElement.addEventListener('submit', function () {
      //evt.preventDefault();
    //});

    const formObject = {
      form: formElement,
      inputList: Array.from(formElement.querySelectorAll(toValidateList.inputSelector)),
      inputErrorClass: toValidateList.inputErrorClass,
      saveButton: formElement.querySelector(toValidateList.submitButtonSelector),
      inactiveButtonClass: toValidateList.inactiveButtonClass,
      formErrorClass: toValidateList.errorClass
    };

    checkFormValidity(formObject);
    //console.log(form);
  });
};


const checkFormValidity = (formObject) => {
  const saveButtonObject = {
    saveButton: formObject.saveButton,
    inactiveButtonClass: formObject.inactiveButtonClass
  }
  //console.log(saveButtonObject);
  formObject.inputList.forEach((inputElement, index) => {

    const inputObject = {
      input: inputElement,
      inputErrorClass: formObject.inputErrorClass,
      errorSpan: formObject.form.querySelector(`.${inputElement.id}-error`)
    };
    //console.log('инпут ' + index +'   ');
    //console.log(inputObject);
    inputElement.addEventListener('input', function () {
    checkInputValidity(inputObject);
    toggleSaveButtonState(inputObject, saveButtonObject);
    });
  });
};

//Функция проверки инпута на валидность
function isInputValid(inputObject) {
  console.log(inputObject.input.value);
  return (inputObject.input.validity.valid);
}

//Функция-реакция на валидность инпута
const checkInputValidity = (inputObject) => {
  if (!isInputValid(inputObject)) {
    console.log('инпут не валидный');
    showInputError(inputObject);
  } else {
    console.log('инпут валидный');
    hideInputError(inputObject);
  }
};

//Функция отображения ошибки при невалидном инпуте
const showInputError = (inputObject) => {
  inputObject.input.classList.add(inputObject.inputErrorClass);
  inputObject.errorSpan.textContent = inputObject.input.validationMessage;
  //errorElement.classList.add('form__input-error_active');
};

//Функция скрытия ошибки при валидном инпуте
const hideInputError = (inputObject) => {
  inputObject.input.classList.remove(inputObject.inputErrorClass);
  inputObject.errorSpan.textContent = '';
};


function toggleSaveButtonState(inputObject, saveButtonObject) {
  console.log(saveButtonObject);
  if (!isInputValid(inputObject)) {
    saveButtonObject.saveButton.classList.add(saveButtonObject.inactiveButtonClass);
    saveButtonObject.saveButton.disabled = true;
  }
  else {
    saveButtonObject.saveButton.classList.remove(saveButtonObject.inactiveButtonClass);
    saveButtonObject.saveButton.disabled = false;
  }
};














enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
});
