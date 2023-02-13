class Card {
    constructor(data, userId, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._likes = data.likes;
        this._handleDeleteClick = handleDeleteClick;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._cardId = data._id;
        this._likeState = this._likes.some(user => user._id === this._userId);
        this._handleLikeClick = handleLikeClick;
    }

    getMethod() {
        return this._likeState ? 'DELETE' : 'PUT';
    }

    _updateLikeState() {
        this._likeState = !this._likeState;
    }

    _getElement() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    deleteCard() {
        this._cardElement.remove();
    }

    _likeCard() {
        this._likeButton.classList.toggle('card__like_active');
    }

    _setEventLiseners() {
        this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this));
        this._likeButton.addEventListener('click', () => this._handleLikeClick(this));
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    getCardId() {
        return this._cardId;
    }

    _updateLikeData(likes) {
        this._likes = likes;
    }

    generateCard() {
        this._cardElement = this._getElement();
        this._cardImage = this._cardElement.querySelector('.card__image');
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        this._cardElement.querySelector('.card__description').textContent = this._name;
        this._likeCounter = this._cardElement.querySelector('.card__like-counter');
        this._setLikeCounter(this._likes.length);
        this._deleteButton = this._cardElement.querySelector('.card__remove');
        this._likeButton = this._cardElement.querySelector('.card__like');
        if (this._userId !== this._ownerId) {
            this._deleteButton.remove();
        }

        if (this._likeState) {
            this._likeCard();
        }
        this._setEventLiseners();
        return this._cardElement;
    }

    _setLikeCounter(likeCount) {
        this._likeCounter.textContent = likeCount;
    }

    set(likes) {
        this._updateLikeData(likes);
        this._setLikeCounter(likes.length);
        this._updateLikeState();
        this._likeCard();
    }
}

export default Card;


