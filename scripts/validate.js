const toValidateList = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};


function enableValidation(toValidateList) {
  //console.log(toValidateList);
  const formList = Array.from(document.querySelectorAll(toValidateList.formSelector));

  formList.forEach((formElement, index) => {

    //создадим объект формы для удобства (передачи его как аргумента)
    const formObject = {
      form: formElement,
      inputList: Array.from(formElement.querySelectorAll(toValidateList.inputSelector)),
      //inputErrorClass: toValidateList.inputErrorClass,
      saveButton: formElement.querySelector(toValidateList.submitButtonSelector),
      //formErrorClass: toValidateList.errorClass
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
      //inputErrorClass: toValidateList.inputErrorClass,
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

//Функция-реакция на валидность конкретного инпута
const checkInputValidity = (inputObject) => {

  if (!isInputValid(inputObject)) {
    //console.log('инпут не валидный');
    showInputError(inputObject);
  } else {
    //console.log('инпут валидный');
    hideInputError(inputObject);
  };
};

//Функция активации/деактивации кнопки сохранить
function toggleSaveButtonState(formObject) {
  if (hasInvalidInput(formObject))
    deactivateButton(formObject.saveButton);
  else
    activateButton(formObject.saveButton);
};

function activateButton(buttonElement) {
  buttonElement.classList.remove(toValidateList.inactiveButtonClass);
  buttonElement.disabled = false;
};

function deactivateButton(buttonElement) {
  buttonElement.classList.add(toValidateList.inactiveButtonClass);
  buttonElement.disabled = true;
};

//Функция проверки существования невалидного инпута на всей форме
function hasInvalidInput(formObject) {
  return formObject.inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Функция проверки конкретного инпута на валидность
function isInputValid(inputObject) {
  return (inputObject.input.validity.valid);
};

//Функция отображения ошибки при невалидном инпуте
const showInputError = (inputObject) => {
  inputObject.input.classList.add(toValidateList.inputErrorClass);
  inputObject.errorSpan.textContent = inputObject.input.validationMessage;
};

//Функция скрытия ошибки при валидном инпуте
const hideInputError = (inputObject) => {
  inputObject.input.classList.remove(toValidateList.inputErrorClass);
  inputObject.errorSpan.textContent = '';
};








enableValidation(toValidateList);
