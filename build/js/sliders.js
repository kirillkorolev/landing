"use strict";

/* eslint-disable */
var setScansSlider = function setScansSlider() {
  var swiper = new Swiper(".la-scans__slider", {
    loop: true,
    watchOverflow: true,
    navigation: {
      nextEl: '.la-scans__button--next',
      prevEl: '.la-scans__button--prev'
    },
    breakpoints: {
      320: {
        spaceBetween: 0,
        slidesPerView: 1,
        centeredSlides: true
      },
      768: {
        spaceBetween: 32,
        centeredSlides: false,
        slidesPerView: "auto"
      },
      1024: {
        spaceBetween: 40,
        centeredSlides: false,
        slidesPerView: "auto"
      }
    }
  });
};

setScansSlider();

var setReviewsSlider = function setReviewsSlider() {
  var swiper = new Swiper(".la-reviews__slider", {
    loop: true,
    watchOverflow: true,
    navigation: {
      nextEl: '.la-reviews__button--next',
      prevEl: '.la-reviews__button--prev'
    },
    breakpoints: {
      300: {
        spaceBetween: 0,
        centeredSlides: true,
        slidesPerView: 1
      },
      768: {
        spaceBetween: 20,
        centeredSlides: false,
        slidesPerView: "auto"
      }
    }
  });
};

setReviewsSlider();
/* eslint-disable */