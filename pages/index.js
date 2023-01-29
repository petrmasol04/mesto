import initialCards from '../scripts/arrays.js';
import Card from '../components/Card.js';
import config from '../scripts/validateConfig.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupBtnOpenPlace = document.querySelector('.profile__add-mesto');
const popupBtnOpenProfile = document.querySelector('.profile__editor');
const popupPlace = document.querySelector('.popup_place');
const formPlace = popupPlace.querySelector('.popup__form_place');

const popupImage = new PopupWithImage('.popup_look');
popupImage.setEventListeners();

const popupProfile = new PopupWithForm('.popup_profile', submitEditProfileForm);
popupProfile.setEventListeners();

const popupPlace2 = new PopupWithForm('.popup_place', submitEditPlaceForm);
popupPlace2.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__description');

function fillInInputsForEditProfileForm() {
    popupProfile.setInputValues(userInfo.getUserInfo());
}

function createCard(data, templateSelector) {
    const card = new Card(data, templateSelector, handleCardClick);
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

popupBtnOpenProfile.addEventListener('click', function () {
    popupProfile.open();
    fillInInputsForEditProfileForm();
}); //Слушатель открытия 

popupBtnOpenPlace.addEventListener('click', function () {
    popupPlace2.open();
    formPlace.reset();
});

function submitEditPlaceForm(evt, data) {
    evt.preventDefault();
    const cardElement = createCard(data, '#card-template');
    showCard.addItem(cardElement);
    popupPlace2.close();
};

function submitEditProfileForm(evt, data) {
    evt.preventDefault();
    userInfo.setUserInfo(data)
    popupProfile.close();
}

document.querySelectorAll(config.formSelector).forEach(form => {
    const formValdidate = new FormValidator(config, form);
    formValdidate.enableValidation();
})

function handleCardClick(name, link) {
    popupImage.open(name, link);
}



