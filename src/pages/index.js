import './index.css';
import Card from '../components/Card.js';
import { config, apiConfig } from '../scripts/configData.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


const popupBtnOpenPlace = document.querySelector('.profile__add-mesto');
const popupBtnOpenProfile = document.querySelector('.profile__editor');
const popupBtnOpenAvatar = document.querySelector('.profile__edit-avatar');



const api = new Api(apiConfig);

const showCard = new Section({
    renderer: renderCard
}, '.cards__container');

const popupImage = new PopupWithImage('.popup_look');
popupImage.setEventListeners();

const popupProfile = new PopupWithForm('.popup_profile', submitEditProfileForm);
popupProfile.setEventListeners();

const popupPlace = new PopupWithForm('.popup_place', submitEditPlaceForm);
popupPlace.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_avatar', handleAvatar);
popupAvatar.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');
const popupWithConfirmation = new PopupWithConfirmation('.popup_remove', deleteCard);

popupWithConfirmation.setEventListeners();

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(res => {
    userInfo.setUserId(res[0]);
    userInfo.setUserInfo(res[0]);
    userInfo.setAvatar(res[0]);
    showCard.renderItems(res[1]);
}).catch((err) => {
    console.log(err); // выведем ошибку в консоль
});

function createCard(data, templateSelector) {
    const userId = userInfo.getUserId();
    const card = new Card(data, userId, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick);
    return card.generateCard();
}

function handleDeleteClick(card) {
    popupWithConfirmation.open(card);
}

function deleteCard(card) {
    const cardId = card.getCardId();
    api.deleteCard(cardId)
        .then(res => {
            card.deleteCard();
            popupWithConfirmation.close();
        }).catch((err) => {
            console.log(err);
        });
    card.deleteCard();
    popupWithConfirmation.close();
}

function fillInInputsForEditProfileForm() {
    popupProfile.setInputValues(userInfo.getUserInfo());
}

function handleCardClick(name, link) {
    popupImage.open(name, link);
}

function handleLikeClick(card) {
    const cardId = card.getCardId();
    const method = card.getMethod();
    api.toggleLikeCard(cardId, method)
        .then(res => {
            card.set(res.likes)
        }).catch((err) => {
            console.log(err);
        })
}

function handleAvatar(data) {
    api.setAvatar(data)
        .then(res => {
            userInfo.setAvatar(res);
            popupAvatar.close();
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            popupAvatar.setDefaultText();
        })
}

function renderCard(data) {
    const card = createCard(data, "#card-template");
    return card;
}

function submitEditPlaceForm(data) {
    api.addNewCard(data)
        .then(res => {
            showCard.addItem(res);
            popupPlace.close()
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            popupPlace.setDefaultText();
        })
};

function submitEditProfileForm(data) {
    api.setUserInfo(data)
        .then(res => {
            userInfo.setUserInfo(res)
            popupProfile.close();
        }).catch((err) => {
            console.log(err); // выведем ошибку в консоль
        }).finally(() => {
            popupProfile.setDefaultText();
        })
}

document.querySelectorAll(config.formSelector).forEach(form => {
    const formValdidate = new FormValidator(config, form);
    formValdidate.enableValidation();
})

popupBtnOpenProfile.addEventListener('click', function () {
    popupProfile.open();
    fillInInputsForEditProfileForm();
});

popupBtnOpenPlace.addEventListener('click', function () {
    popupPlace.open();
});

popupBtnOpenAvatar.addEventListener('click', function () {
    popupAvatar.open();
})



