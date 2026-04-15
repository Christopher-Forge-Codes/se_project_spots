const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (formEl, inputElement, errorMsg, config) => {
  const errorElement = formEl.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMsg;

  errorElement.classList.add(config.errorClass);

  inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputElement, config) => {
  const errorElement = formEl.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = "";

  errorElement.classList.remove(config.errorClass);

  inputElement.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formEl, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formEl,
      inputElement,
      inputElement.validationMessage,
      config,
    );
  } else {
    hideInputError(formEl, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

function resetValidation(formEl, config) {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formEl, inputElement, config);
  });

  const buttonElement = formEl.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
}

const toggleButtonState = (inputList, buttonElement, config) => {
  const isInvalid = hasInvalidInput(inputList);

  buttonElement.disabled = isInvalid;
  buttonElement.classList.toggle(config.inactiveButtonClass, isInvalid);
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formEl, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

  const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);

    formList.forEach((formEl) => {
      setEventListeners(formEl, config);
    });
  };

  enableValidation(settings);
