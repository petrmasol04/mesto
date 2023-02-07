import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(name, link) {
        this._popupLookImg = this._popup.querySelector('.popup__image');
        this._popupCaption = this._popup.querySelector('.popup__caption');
        this._popupLookImg.alt = name;
        this._popupLookImg.src = link;
        this._popupCaption.textContent = name;
        super.open();
    }
}

