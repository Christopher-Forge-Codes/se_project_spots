const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error"
};

const showInputError = (formEl, inputElement, errorMsg, config) => {
  const errorElement = formEl.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMsg;

  inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputElement, config) => {
  const errorElement = formEl.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = "";

  inputElement.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formEl, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formEl, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formEl, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  const isInvalid = hasInvalidInput(inputList);

  buttonElement.disabled = isInvalid;
  buttonElement.classList.toggle(
    "modal__submit-btn_disabled",
    isInvalid
  );
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formEl, inputElement, config);
      toggleButtonState(inputList, buttonElement);
    });
  });

  formEl.addEventListener("submit", (evt) => {
  evt.preventDefault();

  inputList.forEach((inputElement) => {
    hideInputError(formEl, inputElement, config);
  });

  toggleButtonState(inputList, buttonElement);
});
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);