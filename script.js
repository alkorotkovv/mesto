let page = document.querySelector('.page');
let popup = page.querySelector('.popup');
let profileName = page.querySelector('.profile__title');
let profileProfession = page.querySelector('.profile__subtitle');
let popupName = page.querySelector('.popup__name');
let popupProfession = page.querySelector('.popup__profession');


let btnProfileEdit = page.querySelector('.profile__edit-button');
let btnPopupClose = page.querySelector('.popup__close-button');


function openPopup() {
  popup.classList.remove('popup_hidden');
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
}

function closePopup() {
  popup.classList.add('popup_hidden');
}

btnProfileEdit.addEventListener('click', openPopup);
btnPopupClose.addEventListener('click', closePopup);
