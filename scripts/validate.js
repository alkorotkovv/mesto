function enableValidation(toValidateList) {
  //console.log(toValidateList);
  const formList = Array.from(document.querySelectorAll(toValidateList.formSelector));

  formList.forEach((formElement, index) => {

    //создадим объект формы для удобства (передачи его как аргумента)
    const formObject = {
      form: formElement,
      inputList: Array.from(formElement.querySelectorAll(toValidateList.inputSelector)),
      inputErrorClass: toValidateList.inputErrorClass,
      saveButton: formElement.querySelector(toValidateList.submitButtonSelector),
      inactiveButtonClass: toValidateList.inactiveButtonClass,
      formErrorClass: toValidateList.errorClass
    };

    checkFormValidity(formObject);
    //console.log(formObject);
  });
};


const checkFormValidity = (formObject) => {

  formObject.inputList.forEach((inputElement, index) => {

    //создадим объект инпута для удобства (передачи его как аргумента)
    const inputObject = {
      input: inputElement,
      inputErrorClass: formObject.inputErrorClass,
      errorSpan: formObject.form.querySelector(`.${inputElement.id}-error`)
    };
    //console.log(inputObject);

    //добавляем слушатели на все инпуты по событию 'ввод'
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputObject);
      toggleSaveButtonState(formObject);
    });
  });
};

//Функция проверки существования невалидного инпута на всей форме
function hasInvalidInput(formObject) {
  return formObject.inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}

//Функция проверки конкретного инпута на валидность
function isInputValid(inputObject) {
  //console.log(inputObject.input.value);
  return (inputObject.input.validity.valid);
}

//Функция-реакция на валидность конкретного инпута
const checkInputValidity = (inputObject) => {
  //let count = 0;
  if (!isInputValid(inputObject)) {
    //console.log('инпут не валидный');
    showInputError(inputObject);
  } else {
    //console.log('инпут валидный');
    hideInputError(inputObject);
  }
};

//Функция отображения ошибки при невалидном инпуте
const showInputError = (inputObject) => {
  inputObject.input.classList.add(inputObject.inputErrorClass);
  inputObject.errorSpan.textContent = inputObject.input.validationMessage;
};

//Функция скрытия ошибки при валидном инпуте
const hideInputError = (inputObject) => {
  inputObject.input.classList.remove(inputObject.inputErrorClass);
  inputObject.errorSpan.textContent = '';
};

//Функция активации/деактивации кнопки сохранить
function toggleSaveButtonState(formObject) {
  if (hasInvalidInput(formObject)) {
    formObject.saveButton.classList.add(formObject.inactiveButtonClass);
    formObject.saveButton.disabled = true;
  }
  else {
    formObject.saveButton.classList.remove(formObject.inactiveButtonClass);
    formObject.saveButton.disabled = false;
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
