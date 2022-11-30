
const initialCards = [
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


const popupLook = document.querySelector('.popup_look');
const popupBtnCloseLook = document.querySelector('.popup__btn-close_image');     // попап картинки

const templateCard = document.querySelector('#card-template');
const templateItem = templateCard.querySelector('.card');
const cardContainer = document.querySelector('.cards__container');

function openPopup(popupElement) {
    popupElement.classList.add('popup_open');   // Функция открытия
    rename();
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_open');   //  Функция закртыия popup
} //  Функция закртыия popup

function rename() {
    inputNameProfile.value = profileNameElement.textContent;
    inputDescriptionProfile.value = profileDescriptionElement.textContent;
}

function formSubmit(event) {
    event.preventDefault();
    profileNameElement.textContent = inputNameProfile.value;
    profileDescriptionElement.textContent = inputDescriptionProfile.value;    // Функция после клика не перезагружает страницу, сохраняет изменения и закрывает форму
    closePopup(popupProfile);
}

// создаем карточку
function createCard(placeValue, urlValue) {
    const templateCard = document.querySelector('#card-template').content;
    const templateItem = templateCard.querySelector('.card').cloneNode(true);
    const templateImg = templateItem.querySelector('.card__image');
    const popupLookImg = popupLook.querySelector('.popup__image');
    templateImg.alt = placeValue;
    templateImg.src = urlValue;
    templateItem.querySelector('.card__description').textContent = placeValue;
    templateItem.querySelector('.card__remove').addEventListener('click', function (element) {
        const deletCard = element.target;                                                             // delete
        deletCard.closest('.card').remove();
    });
    templateItem.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active');      // like
    });
    templateImg.addEventListener('click', function () {
        popupLookImg.alt = placeValue;
        popupLookImg.src = urlValue;
        popupLook.querySelector('.popup__caption').textContent = placeValue;   // отобразить картинку
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
    rename();
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

popupBtnCloseLook.addEventListener('click', function () {
    closePopup(popupLook);
});

formPlace.addEventListener('submit', function (evt) {
    evt.preventDefault();
    prependCard(inputPlace.value, inputUrl.value);
    inputPlace.value = '';
    inputUrl.value = '';
    closePopup(popupPlace);
});




