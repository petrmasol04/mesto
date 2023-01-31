class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;  // #card_template
        this._handleCardClick = handleCardClick;
    }

    _getElement() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
        return cardElement;
    }

    _deleteCard() {
        this._cardElement.remove();
    }

    _likeCard() {
        this._likeButton.classList.toggle('card__like_active');
    }

    _setEventLiseners() {
        this._cardElement.querySelector('.card__remove').addEventListener('click', () => this._deleteCard());
        this._likeButton = this._cardElement.querySelector('.card__like');
        this._likeButton.addEventListener('click', () => this._likeCard());
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    generateCard() {
        this._cardElement = this._getElement();
        this._cardImage = this._cardElement.querySelector('.card__image');
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        this._cardElement.querySelector('.card__description').textContent = this._name;
        this._setEventLiseners();
        return this._cardElement;
    }

}

export default Card;


