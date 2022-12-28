class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
    }

    _showError(input) {
        this._error.textContent = input.validationMessage;
        this._error.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);
    }

    _hideError(input) {
        this._error.textContent = '';
        this._error.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
    }

    _checkInputValid(input) {
        this._error = document.querySelector(`#${input.id}-error`);
        input.validity.valid ? this._hideError(input) : this._showError(input);
    }

    _makeButtonActive() {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.disabled = '';
    }

    _makeButtonInactive() {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.disabled = 'disabled';
    }

    _toggleButtonValid() {
        this._isValid = this._inputs.every(input => input.validity.valid);
        this._isValid ? this._makeButtonActive() : this._makeButtonInactive();
    };

    _makeEventListeners() {
        this._formElement.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonValid();
            }, 0);
        });
    }

    enableValidation() {
        this._inputs = [...this._formElement.querySelectorAll(this._inputSelector)];
        this._button = this._formElement.querySelector(this._submitButtonSelector);
        this._inputs.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValid(input);
                this._toggleButtonValid();
            })
            this._makeEventListeners();
        })
    }
}

export default FormValidator; 