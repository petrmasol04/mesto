import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._popup.querySelectorAll('.popup__input');
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            this._data = this._getInputValues();
            this._handleFormSubmit(evt, this._data)
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
}








