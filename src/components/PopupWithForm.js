import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._submitBtn = this._form.querySelector('.popup__btn');
        this._submitBtnDefaultText = this._submitBtn.textContent;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._data = this._getInputValues();
            this._submitBtn.textContent = 'Сохранение...';
            this._handleFormSubmit(this._data)
        })
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }

    _getInputValues() {
        this._inputsData = {};
        this._inputs.forEach((input) => {
            this._inputsData[input.name] = input.value;
        })
        return this._inputsData;
    }

    setInputValues(data) {
        this._inputs.forEach((input) => {
            input.value = data[input.name];
        })
    }

    setDefaultText() {
        this._submitBtn.textContent = this._submitBtnDefaultText;
    }
}








