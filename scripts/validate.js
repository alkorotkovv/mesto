function enableValidation(toValidateList) {
  //console.log(toValidateList);
  const formList = Array.from(document.querySelectorAll(toValidateList.formSelector));

  formList.forEach((formElement, index) => {
    formElement.addEventListener('submit', function () {
      evt.preventDefault();
    });
    const form = {
      inputList: Array.from(formElement.querySelectorAll(toValidateList.inputSelector)),
      saveButton: Array.from(formElement.querySelectorAll(toValidateList.submitButtonSelector)),
      inactiveButtonClass: toValidateList.inactiveButtonClass,
      inputErrorClass: toValidateList.inputErrorClass,
      formErrorClass: toValidateList.errorClass
    };
    /*
    console.log('форма ' + index +'   ');
    console.log(formElement);
    console.log('инпуты формы ' + index +'   ');
    console.log(form.inputList);
    console.log('кнопка формы ' + index +'   ');
    console.log(form.saveButton);
    console.log('класс неактивной кнопки ' + index +'   ' + form.inactiveButtonClass);
    console.log('класс ошибка инпута ' + index +'   ' + form.inputErrorClass);
    console.log('класс ошибка формы ' + index +'   ' + form.formErrorClass);
    */
    checkFormValidity(form);
  });
};


const checkFormValidity = (formElement) => {
  //console.log('проверка валидности формы');
  formElement.inputList.forEach((inputElement, index) => {
    const input = inputElement;
    //console.log('инпут ' + index +'   ');
    //console.log(inputElement);
    input.addEventListener('input', function () {
      checkInputValidity(input);
    });
  });
};


const checkInputValidity = (inputElement) => {
  console.log('проверка валидности инпутов');
  if (!inputElement.validity.valid) {
    console.log(inputElement);
    console.log('инпут не валидный');
    showInputError(inputElement, inputElement.validationMessage);
  } else {
    console.log(inputElement);
    console.log('инпут валидный');
    hideInputError(inputElement, inputElement.validationMessage);
  }
};


const showInputError = (inputElement, errorMessage) => {
  //const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  //errorElement.textContent = errorMessage;
  //errorElement.classList.add('form__input-error_active');
};

const hideInputError = (inputElement, errorMessage) => {
  //const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  //errorElement.classList.remove('form__input-error_active');
  //errorElement.textContent = '';
};

















enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
});
