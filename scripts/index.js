import initialCards from './arrays.js';

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
const popupBtnCreatePlace = popupPlace.querySelector('.popup__btn-create');
const popupBtnClosePlace = popupPlace.querySelector('.popup__btn-close_place');
const formPlace = popupPlace.querySelector('.popup__form_place');
const inputPlace = formPlace.querySelector('#place');
const inputUrl = formPlace.querySelector('#url');


const popupLook = document.querySelector('.popup_look');
const popupBtnCloseLook = document.querySelector('.popup__btn-close_image');     // попап картинки
const popupLookImg = popupLook.querySelector('.popup__image');
const popupCaption = popupLook.querySelector('.popup__caption');

const templateCard = document.querySelector('#card-template').content;
const templateItem = templateCard.querySelector('.card');
const cardContainer = document.querySelector('.cards__container');

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

// создаем карточку
function createCard(placeValue, urlValue) {
    const templateItem = templateCard.querySelector('.card').cloneNode(true);
    const templateImg = templateItem.querySelector('.card__image');
    templateImg.alt = placeValue;
    templateImg.src = urlValue;
    templateItem.querySelector('.card__description').textContent = placeValue;
    templateItem.querySelector('.card__remove').addEventListener('click', function (element) {
        const card = element.target;                                                   // delete
        card.closest('.card').remove();
    });
    templateItem.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active');      // like
    });
    templateImg.addEventListener('click', function () {
        popupLookImg.alt = placeValue;
        popupLookImg.src = urlValue;
        popupCaption.textContent = placeValue;   // отобразить картинку
        openPopup(popupLook);
    });
    return templateItem;
}

function prependCard(textValue, linkValue) {
    cardContainer.prepend(createCard(textValue, linkValue));
};

initialCards.forEach(function (element) {
    prependCard(element.name, element.link);
});


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
    popupBtnCreatePlace.setAttribute('disabled', 'disabled');
    popupBtnCreatePlace.classList.add('popup__btn_disabled');
});

formPlace.addEventListener('submit', function (evt) {
    evt.preventDefault();
    prependCard(inputPlace.value, inputUrl.value);
    inputPlace.value = '';
    inputUrl.value = '';
    closePopup(popupPlace);
});



