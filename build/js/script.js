'use strict';

var setupViewPager = function () {
  var prevButton = document.querySelector('.prev');
  var nextButton = document.querySelector('.next');
  var slides = document.querySelectorAll('.slide');
  var currentSlide = 0;

  prevButton.addEventListener('click', function () {
    slides[currentSlide].classList.remove('current');
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    slides[currentSlide].classList.add('current');
  });
  nextButton.addEventListener('click', function () {
    slides[currentSlide].classList.remove('current');
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
    slides[currentSlide].classList.add('current');
  });

};

var jsOn = function () {
  var elements = document.querySelectorAll('.no-js');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('no-js');
  }
};

setupViewPager();
jsOn();
