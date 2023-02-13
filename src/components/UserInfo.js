export default class UserInfo {
    constructor(nameSelector, descriptionSelector, avatarSelector) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return { name: this._name.textContent, about: this._description.textContent }
    }

    setUserInfo({ name, about }) {
        this._name.textContent = name;
        this._description.textContent = about;
    }

    setAvatar({ avatar }) {
        this._avatar.src = avatar;
    }

    setUserId({ _id }) {
        this._userId = _id;
    }

    getUserId() {
        return this._userId;
    }
}