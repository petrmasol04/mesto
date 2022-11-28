
const popupProfile = document.querySelector('.popup_profile');
const popupBtnCloseProfile = popupProfile.querySelector('.popup__btn-close_profile');
const popupBtnOpenProfile = document.querySelector('.profile__editor');
const formProfile = popupProfile.querySelector('.popup__form_profile');
const inputNameProfile = formProfile.querySelector('#name');
const inputDescriptionProfile = formProfile.querySelector('#description');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

const popupBtnOpenPlace = document.querySelector('.profile__add-mesto');
const popupPlace = document.querySelector('.popup_place');
const popupBtnClosePlace = popupPlace.querySelector('.popup__btn-close_place');
const formPlace = popupPlace.querySelector('.popup__form_place');
const inputPlace = formPlace.querySelector('#place');
const inputUrl = formPlace.querySelector('#url');


function openPopup(popupElement) {
    popupElement.classList.add('popup_open')
    rename();
} // Функция открытия

function closePopup(popupElement) {
    popupElement.classList.remove('popup_open')
} //  Функция закртыия popup

function rename() {
    inputNameProfile.value = profileNameElement.textContent;
    inputDescriptionProfile.value = profileDescriptionElement.textContent;
}

function formSubmit(event) {
    event.preventDefault();
    profileNameElement.textContent = inputNameProfile.value;
    profileDescriptionElement.textContent = inputDescriptionProfile.value;
    closePopup(popupProfile);
} // Функция после клика не перезагружает страницу, сохраняет изменения и закрывает форму



popupBtnOpenProfile.addEventListener('click', function () {
    openPopup(popupProfile);

}); //Слушатель открытия 

popupBtnCloseProfile.addEventListener('click', function () {
    closePopup(popupProfile);
}); // Слушатель закрытия

formProfile.addEventListener('submit', formSubmit); // Слушатель сохранения и закрытия формы

popupBtnOpenPlace.addEventListener('click', function () {
    openPopup(popupPlace);
});

popupBtnClosePlace.addEventListener('click', function () {
    closePopup(popupPlace);
});






