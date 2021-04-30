"use strict";

var questionsBlock = document.querySelector(".la-questions");
var header = document.querySelector(".la-header");
var requestForm = document.querySelector(".la-request__form");
var companyName = requestForm.querySelector(".la-request__item--company");
var companyPersonName = requestForm.querySelector(".la-request__item--contact");
var companyPhone = requestForm.querySelector(".la-request__item--phone");
var companyEmail = requestForm.querySelector(".la-request__item--email");
var formItemBlocks = requestForm.querySelectorAll(".la-request__item");
var ESC_KEYCODE = 27;
var blackout = document.querySelector(".la-blackout");
var bodyGlobal = document.querySelector("body");
var thanksModal = document.querySelector(".la-thanks");
var closeThanksButton = thanksModal.querySelector(".js-close-thanks-modal");

var showBlackout = function showBlackout() {
  if (blackout.classList.contains("la-blackout--hidden")) {
    blackout.classList.remove("la-blackout--hidden");
  }
};

var hideBlackout = function hideBlackout() {
  if (!blackout.classList.contains("la-blackout--hidden")) {
    blackout.classList.add("la-blackout--hidden");
  }
};

var blockBackground = function blockBackground() {
  bodyGlobal.style.overflow = "hidden";
  bodyGlobal.style.touchAction = "none";
};

var unBlockBackground = function unBlockBackground() {
  bodyGlobal.style.overflow = "";
  bodyGlobal.style.touchAction = "";
};

if (questionsBlock) {
  var questionsButtons = questionsBlock.querySelectorAll(".js-questions-button");
  questionsButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      button.classList.toggle("la-questions__button--opened");
      var text = button.nextElementSibling;
      text.classList.toggle("la-questions__text--opened");

      if (text.style.maxHeight) {
        text.style.maxHeight = null;
      } else {
        text.style.maxHeight = text.scrollHeight + "px";
      }
    });
  });
}

window.addEventListener("scroll", function () {
  var requestLinkTop = document.querySelector(".js-request-link").getBoundingClientRect().top;

  if (requestLinkTop <= 0 && !header.classList.contains("la-header--fixed")) {
    header.classList.add("la-header--fixed");
  } else if (requestLinkTop > 0 && header.classList.contains("la-header--fixed")) {
    header.classList.remove("la-header--fixed");
  }
});

var resetErrorOnInput = function resetErrorOnInput(item, errorClass) {
  var input = item.querySelector("input");

  if (input.classList.contains(errorClass)) {
    input.classList.remove(errorClass);
  }
};

var validateText = function validateText(textItem, errorClass) {
  var name = textItem.querySelector("input").value;

  if (!name) {
    textItem.classList.add(errorClass);
    return false;
  } else {
    resetErrorOnInput(textItem, errorClass);
    return true;
  }
};

var validatePhone = function validatePhone(phoneItem, errorClass) {
  var phone = phoneItem.querySelector("input").value;
  var regEx = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

  if (regEx.test(phone) === false) {
    phoneItem.classList.add(errorClass);
    return false;
  } else {
    resetErrorOnInput(phoneItem, errorClass);
    return true;
  }
};

var validateEmail = function validateEmail(emailItem, errorClass) {
  var mail = emailItem.querySelector("input").value;
  var regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (regEx.test(mail) === false) {
    emailItem.classList.add(errorClass);
    return false;
  } else {
    resetErrorOnInput(emailItem, errorClass);
    return true;
  }
};

var removeClassWithChecking = function removeClassWithChecking(item, className) {
  if (item.classList.contains(className)) {
    item.classList.remove(className);
  }
};

var resetFormErrors = function resetFormErrors() {
  formItemBlocks.forEach(function (item) {
    removeClassWithChecking(item, "la-request__item--error");
  });
};

var closeThanksModal = function closeThanksModal() {
  if (!thanksModal.classList.contains("la-thanks--hidden")) {
    thanksModal.classList.add("la-thanks--hidden");
    unBlockBackground();
    hideBlackout();
    blackout.removeEventListener("click", closeThanksModal);
    document.removeEventListener("keydown", closeThanksModalWithEsc);
    requestForm.reset();
  }
};

var closeThanksModalWithEsc = function closeThanksModalWithEsc(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeThanksModal();
  }
};

requestForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  resetFormErrors();

  if (validateEmail(companyEmail, "la-request__item--error") && validateText(companyName, "la-request__item--error") && validatePhone(companyPhone, "la-request__item--error") && validateText(companyPersonName, "la-request__item--error")) {
    blockBackground();
    showBlackout();
    removeClassWithChecking(thanksModal, "la-thanks--hidden");
    blackout.addEventListener("click", closeThanksModal);
    document.addEventListener("keydown", closeThanksModalWithEsc);
  }
});
closeThanksButton.addEventListener("click", closeThanksModal);