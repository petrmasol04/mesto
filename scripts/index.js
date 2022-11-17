const popupElement = document.querySelector('.popup'); //Ищем блок popup в разметке
const popupBtnCloseElement = popupElement.querySelector('.popup__btn-close'); //Ищем в блоке popup, popup__btn-close
const popupOpenEditorElement = document.querySelector('.profile__editor'); //Ищем кнопку 'редактировать' в разметке
const formElement = popupElement.querySelector('.popup__form'); //Ищем форму в блоке popup
const inputNameElement = formElement.querySelector('#name');
const inputDescriptionElement = formElement.querySelector('#description'); //Ищем два input в блоке popup__form
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

function openPopup() {
    popupElement.classList.add('popup_open')
    rename()
} // Функция открытия

function closePopup() {
    popupElement.classList.remove('popup_open')
} //  Функция закртыия popup

function rename() {
    inputNameElement.value = profileNameElement.textContent;
    inputDescriptionElement.value = profileDescriptionElement.textContent;
}

function formSubmit(event) {
    event.preventDefault();
    profileNameElement.textContent = inputNameElement.value;
    profileDescriptionElement.textContent = inputDescriptionElement.value;
    closePopup();
} // Функция после клика не перезагружает страницу, сохраняет изменения и закрывает форму



popupOpenEditorElement.addEventListener('click', openPopup); //Слушатель открытия 
popupBtnCloseElement.addEventListener('click', closePopup); // Слушатель закрытия
formElement.addEventListener('submit', formSubmit); // Слушатель сохранения и закрытия формы




