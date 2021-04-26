const questionsBlock = document.querySelector(`.la-questions`);

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

const header = document.querySelector(`.la-header`);

window.addEventListener(`scroll`, () => {
  let requestLinkTop = document.querySelector(`.js-request-link`).getBoundingClientRect().top;

  if (requestLinkTop <= 0 && !header.classList.contains(`la-header--fixed`)) {
    header.classList.add(`la-header--fixed`);
  } else if (requestLinkTop > 0 && header.classList.contains(`la-header--fixed`)) {
    header.classList.remove(`la-header--fixed`);
  }
});
