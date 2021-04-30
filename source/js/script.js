const questionsBlock = document.querySelector(`.la-questions`);
const header = document.querySelector(`.la-header`);

const requestForm = document.querySelector(`.la-request__form`);
const companyName = requestForm.querySelector(`.la-request__item--company`);
const companyPersonName = requestForm.querySelector(`.la-request__item--contact`);
const companyPhone = requestForm.querySelector(`.la-request__item--phone`);
const companyEmail = requestForm.querySelector(`.la-request__item--email`);

const formItemBlocks = requestForm.querySelectorAll(`.la-request__item`);

const ESC_KEYCODE = 27;
const blackout = document.querySelector(`.la-blackout`);
const bodyGlobal = document.querySelector(`body`);

const thanksModal = document.querySelector(`.la-thanks`);
const closeThanksButton = thanksModal.querySelector(`.js-close-thanks-modal`);

const showBlackout = () => {
  if (blackout.classList.contains(`la-blackout--hidden`)) {
    blackout.classList.remove(`la-blackout--hidden`);
  }
};

const hideBlackout = () => {
  if (!blackout.classList.contains(`la-blackout--hidden`)) {
    blackout.classList.add(`la-blackout--hidden`);
  }
};

const blockBackground = () => {
  bodyGlobal.style.overflow = `hidden`;
  bodyGlobal.style.touchAction = `none`;
};

const unBlockBackground = () => {
  bodyGlobal.style.overflow = ``;
  bodyGlobal.style.touchAction = ``;
};


if (questionsBlock) {
  const questionsButtons = questionsBlock.querySelectorAll(`.js-questions-button`);

  questionsButtons.forEach((button) => {
    button.addEventListener(`click`, () => {
      button.classList.toggle(`la-questions__button--opened`);
      const text = button.nextElementSibling;
      text.classList.toggle(`la-questions__text--opened`);

      if (text.style.maxHeight) {
        text.style.maxHeight = null;
      } else {
        text.style.maxHeight = text.scrollHeight + `px`;
      }
    });
  });
}

window.addEventListener(`scroll`, () => {
  let requestLinkTop = document.querySelector(`.js-request-link`).getBoundingClientRect().top;

  if (requestLinkTop <= 0 && !header.classList.contains(`la-header--fixed`)) {
    header.classList.add(`la-header--fixed`);
  } else if (requestLinkTop > 0 && header.classList.contains(`la-header--fixed`)) {
    header.classList.remove(`la-header--fixed`);
  }
});

const resetErrorOnInput = (item, errorClass) => {
  const input = item.querySelector(`input`);

  if (input.classList.contains(errorClass)) {
    input.classList.remove(errorClass);
  }
};


const validateText = (textItem, errorClass) => {
  const name = textItem.querySelector(`input`).value;
  if (!name) {
    textItem.classList.add(errorClass);

    return false;
  } else {
    resetErrorOnInput(textItem, errorClass);

    return true;
  }
};

const validatePhone = (phoneItem, errorClass) => {
  const phone = phoneItem.querySelector(`input`).value;
  const regEx = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

  if (regEx.test(phone) === false) {
    phoneItem.classList.add(errorClass);

    return false;
  } else {

    resetErrorOnInput(phoneItem, errorClass);

    return true;
  }
};

const validateEmail = (emailItem, errorClass) => {
  const mail = emailItem.querySelector(`input`).value;
  const regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (regEx.test(mail) === false) {
    emailItem.classList.add(errorClass);

    return false;
  } else {
    resetErrorOnInput(emailItem, errorClass);

    return true;
  }
};

const removeClassWithChecking = (item, className) => {
  if (item.classList.contains(className)) {
    item.classList.remove(className);
  }
};

const resetFormErrors = () => {
  formItemBlocks.forEach((item) => {
    removeClassWithChecking(item, `la-request__item--error`);
  });
};

const closeThanksModal = () => {
  if (!thanksModal.classList.contains(`la-thanks--hidden`)) {
    thanksModal.classList.add(`la-thanks--hidden`);

    unBlockBackground();
    hideBlackout();

    blackout.removeEventListener(`click`, closeThanksModal);
    document.removeEventListener(`keydown`, closeThanksModalWithEsc);

    requestForm.reset();
  }
};

const closeThanksModalWithEsc = (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    closeThanksModal();
  }
};


requestForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  resetFormErrors();

  if (validateEmail(companyEmail, `la-request__item--error`) && validateText(companyName, `la-request__item--error`) && validatePhone(companyPhone, `la-request__item--error`) && validateText(companyPersonName, `la-request__item--error`)) {
    blockBackground();
    showBlackout();

    removeClassWithChecking(thanksModal, `la-thanks--hidden`);
    blackout.addEventListener(`click`, closeThanksModal);
    document.addEventListener(`keydown`, closeThanksModalWithEsc);
  }
});

closeThanksButton.addEventListener(`click`, closeThanksModal);
