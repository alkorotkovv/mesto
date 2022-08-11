//Блок объявления переменных
export const page = document.querySelector('.page');
export const formEdit = page.querySelector('.form_profile_edit');
export const formAdd = page.querySelector('.form_card_add');
export const formAvatar = page.querySelector('.form_avatar_edit');
export const buttonProfileEdit = page.querySelector('.profile__edit-button');
export const buttonProfileAdd = page.querySelector('.profile__add-button');
export const buttonAvatarEdit = page.querySelector('.profile__avatar');
export const nameInput = formEdit.querySelector('.form__input_content_name');
export const jobInput = formEdit.querySelector('.form__input_content_job');
export const placeInput = formAdd.querySelector('.form__input_content_place');
export const urlInput = formAdd.querySelector('.form__input_content_url');



//Массив объектов с данными карточек
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Объект с селекторами, необходимых для валидации
export const validateList = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};
