const checkInputValid = (obj, input) => {
    const { inputErrorClass, errorClass } = obj;
    const error = document.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
        error.textContent = '';
        error.classList.remove(errorClass);
        input.classList.remove(inputErrorClass);
    } else {
        error.textContent = input.validationMessage;
        error.classList.add(errorClass);
        input.classList.add(inputErrorClass);
    }
};

const toggleButtonValid = (obj, inputs, button) => {
    const { inactiveButtonClass } = obj;
    const isValid = inputs.every(input => input.validity.valid);
    if (isValid) {
        button.classList.remove(inactiveButtonClass);
        button.disabled = '';
    } else {
        button.classList.add(inactiveButtonClass);
        button.disabled = 'disabled';
    }
};

const enableValidation = (obj) => {
    const { formSelector, inputSelector, submitButtonSelector, ...rest } = obj;
    const forms = [...document.querySelectorAll(formSelector)];

    forms.forEach(form => {
        const inputs = [...form.querySelectorAll(inputSelector)];
        const button = form.querySelector(submitButtonSelector);

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                checkInputValid(rest, input);
                toggleButtonValid(rest, inputs, button);
            })
        })
    })
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});
