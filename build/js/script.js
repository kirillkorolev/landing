"use strict";

var questionsBlock = document.querySelector(".la-questions");

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

var header = document.querySelector(".la-header");
window.addEventListener("scroll", function () {
  var requestLinkTop = document.querySelector(".js-request-link").getBoundingClientRect().top;

  if (requestLinkTop <= 0 && !header.classList.contains("la-header--fixed")) {
    header.classList.add("la-header--fixed");
  } else if (requestLinkTop > 0 && header.classList.contains("la-header--fixed")) {
    header.classList.remove("la-header--fixed");
  }
});