function enableValidation(toValidateList) {
  //console.log(toValidateList);
  const formList = Array.from(document.querySelectorAll(toValidateList.formSelector));

  formList.forEach((formElement, index) => {
    formElement.addEventListener('submit', function () {
      evt.preventDefault();
    });

    const formObject = {
      form: formElement,
      inputList: Array.from(formElement.querySelectorAll(toValidateList.inputSelector)),
      inputErrorClass: toValidateList.inputErrorClass,
      saveButton: Array.from(formElement.querySelectorAll(toValidateList.submitButtonSelector)),
      inactiveButtonClass: toValidateList.inactiveButtonClass,
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
    checkFormValidity(formObject);
    //console.log(form);
  });
};


const checkFormValidity = (formObject) => {
  //console.log('проверка валидности формы');
  formObject.inputList.forEach((inputElement, index) => {

    const inputObject = {
      input: inputElement,
      inputErrorClass: formObject.inputErrorClass,
      errorSpan: formObject.form.querySelector(`.${inputElement.id}-error`)
    };
    //console.log('инпут ' + index +'   ');
    console.log(inputObject);
    inputElement.addEventListener('input', function () {
    checkInputValidity(inputObject);
    });
  });
};


const checkInputValidity = (inputObject) => {
  console.log('проверка валидности инпутов');
  if (!inputObject.input.validity.valid) {
    //console.log(inputElement);
    console.log('инпут не валидный');
    showInputError(inputObject);
  } else {
    //console.log(inputElement);
    console.log('инпут валидный');
    hideInputError(inputObject);
  }
};


const showInputError = (inputObject) => {
  //const inputElement = inputObject.input;
  //const inputErrorClass = inputObject.inputErrorClass;
  inputObject.input.classList.add(inputObject.inputErrorClass);
  inputObject.errorSpan.textContent = inputObject.input.validationMessage;
  //errorElement.classList.add('form__input-error_active');
};

const hideInputError = (inputObject) => {
  //const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputObject.input.classList.remove(inputObject.inputErrorClass);
  inputObject.errorSpan.textContent = '';
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
