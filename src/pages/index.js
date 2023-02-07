import './index.css';
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

const popupImage = new PopupWithImage('.popup_look');
popupImage.setEventListeners();

const popupProfile = new PopupWithForm('.popup_profile', submitEditProfileForm);
popupProfile.setEventListeners();

const popupPlace = new PopupWithForm('.popup_place', submitEditPlaceForm);
popupPlace.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__description');

function createCard(data, templateSelector) {
    const card = new Card(data, templateSelector, handleCardClick);
    return card.generateCard();
}

function fillInInputsForEditProfileForm() {
    popupProfile.setInputValues(userInfo.getUserInfo());
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
    popupPlace.open();
});

function submitEditPlaceForm(evt, data) {
    evt.preventDefault();
    const cardElement = createCard(data, '#card-template');
    showCard.addItem(cardElement);
    popupPlace.close();
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







