import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners() {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._card);
        })
        super.setEventListeners();
    }

    open(card) {
        this._card = card;
        super.open();
    }
}
