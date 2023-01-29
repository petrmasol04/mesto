import initialCards from '../scripts/arrays.js';
import Card from '../components/Card.js';
import config from '../scripts/validateConfig.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

const popupProfile = document.querySelector('.popup_profile');
const popupBtnOpenProfile = document.querySelector('.profile__editor');
const formProfile = popupProfile.querySelector('.popup__form_profile');
const inputNameProfile = formProfile.querySelector('#name');
const inputDescriptionProfile = formProfile.querySelector('#description');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

const popupBtnOpenPlace = document.querySelector('.profile__add-mesto');
const popupPlace = document.querySelector('.popup_place');
// const popupBtnCreatePlace = popupPlace.querySelector('.popup__btn-create');

const formPlace = popupPlace.querySelector('.popup__form_place');

const inputPlace = formPlace.querySelector('#place');
const inputUrl = formPlace.querySelector('#url');


const popupLook = document.querySelector('.popup_look');    // попап картинки
const popupLookImg = popupLook.querySelector('.popup__image');
const popupCaption = popupLook.querySelector('.popup__caption');



const handlerKeyUp = (e) => {
    if (e.key === 'Escape') {
        const modalOpen = document.querySelector('.popup_open');
        closePopup(modalOpen);
    }
};


function openPopup(popupElement) {
    popupElement.classList.add('popup_open');
    document.addEventListener('keyup', handlerKeyUp);   // Функция открытия
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_open');
    document.removeEventListener('keyup', handlerKeyUp);   //  Функция закртыия popup
}

function fillInInputsForEditProfileForm() {
    inputNameProfile.value = profileNameElement.textContent;
    inputDescriptionProfile.value = profileDescriptionElement.textContent;
}

function submitEditProfileForm(event) {
    event.preventDefault();
    profileNameElement.textContent = inputNameProfile.value;
    profileDescriptionElement.textContent = inputDescriptionProfile.value;    // Функция после клика не перезагружает страницу, сохраняет изменения и закрывает форму
    closePopup(popupProfile);
}
// const cardElement = createCard(cardData, '#card-template');
function createCard(data, templateSelector) {
    const card = new Card(data, templateSelector);
    const cardElement = card.generateCard();
    return cardElement;
}

const showCard = new Section({
    items: initialCards,
    renderer: renderCard
}, '.cards__container');

showCard.renderItems();

function renderCard(data) {
    const card = createCard(data, "#card-template");
    showCard.addItem(card);
}

//Обработчики событий.....

popupBtnOpenProfile.addEventListener('click', function () {
    openPopup(popupProfile);
    fillInInputsForEditProfileForm();
}); //Слушатель открытия 

document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) {
            closePopup(popup);
        };
    });
});

formProfile.addEventListener('submit', submitEditProfileForm); // Слушатель сохранения и закрытия формы

popupBtnOpenPlace.addEventListener('click', function () {
    openPopup(popupPlace);
    formPlace.reset();
});

function getCardData() {
    const cardData = { name: inputPlace.value, link: inputUrl.value };
    return cardData;
}

formPlace.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const cardData = getCardData();
    const cardElement = createCard(cardData, '#card-template');
    showCard.addItem(cardElement);
    closePopup(popupPlace);
});

document.querySelectorAll(config.formSelector).forEach(form => {
    const formValdidate = new FormValidator(config, form);
    formValdidate.enableValidation();
})

export { popupLookImg, popupCaption, openPopup, popupLook }



