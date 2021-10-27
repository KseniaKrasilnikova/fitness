'use strict';

var setupViewPager = function () {
  var prevButton = document.querySelector('.reviews__previous-btn');
  var nextButton = document.querySelector('.reviews__previous-next');
  var slides = document.querySelectorAll('.reviews__slide');
  var currentSlide = 0;

  nextButton.addEventListener('click', function () {
    slides[currentSlide].classList.remove('current');
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    slides[currentSlide].classList.add('current');
  });
  prevButton.addEventListener('click', function () {
    slides[currentSlide].classList.remove('current');
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
    slides[currentSlide].classList.add('current');
  });
};

var setupSubscriptionTabs = function () {
  var firstTab = document.getElementById('first-tab');
  var secondTab = document.getElementById('second-tab');
  var thirdTab = document.getElementById('third-tab');
  var tabs = document.querySelectorAll('.subscriptions li');
  var subscriptions = document.querySelectorAll('.subscriptions__wrapper');
  var currentTab = 0;

  firstTab.addEventListener('click', function () {
    onTabClicked(0);
  });
  secondTab.addEventListener('click', function () {
    onTabClicked(1);
  });
  thirdTab.addEventListener('click', function () {
    onTabClicked(2);
  });

  var onTabClicked = function (selectedTab) {
    if (currentTab === selectedTab) {
      return;
    }
    tabs[currentTab].classList.remove('active');
    tabs[selectedTab].classList.add('active');
    for (var i = 0; i < subscriptions.length; i++) {
      subscriptions[i].classList.remove('current');
    }
    currentTab = selectedTab;
    for (var k = 3 * currentTab; k <= 3 * currentTab + 2; k++) {
      subscriptions[k].classList.add('current');
    }
  };
};

var jsOn = function () {
  var elements = document.querySelectorAll('.no-js');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('no-js');
  }
};

var setupForm = function () {
  var formName = document.getElementById('name');
  var formPhone = document.getElementById('phone');
  var phoneError = document.getElementById('phone-error');
  var nameError = document.getElementById('name-error');
  var formSubmitBtn = document.getElementById('form-submit');


  var validateName = function (inputElement, errorElement) {
    var nameIsValid = /^[a-zA-ZЁёа-яА-Я ]{2,30}$/.test(inputElement.value);
    if (nameIsValid) {
      inputElement.classList.remove('form__input-invalid');
      inputElement.blur();
      errorElement.classList.add('visually-hidden');
    } else {
      inputElement.classList.add('form__input-invalid');
      inputElement.blur();
      errorElement.classList.remove('visually-hidden');
    }
    return nameIsValid;
  };

  var validatePhone = function (inputElement, errorElement) {
    var phoneNmbIsValid = /^(\+7)?[\s\-]?\(?[\s\-]?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/.test(inputElement.value);
    if (phoneNmbIsValid) {
      inputElement.classList.remove('form__input-invalid');
      inputElement.blur();
      errorElement.classList.add('visually-hidden');
    } else {
      inputElement.classList.add('form__input-invalid');
      inputElement.blur();
      errorElement.classList.remove('visually-hidden');
    }
    return phoneNmbIsValid;
  };

  var isFormValid = function () {
    return validateName(formName, nameError)
      & validatePhone(formPhone, phoneError);
  };

  var resetForm = function (inputElements, errorElements) {
    for (var i = 0; i < inputElements.length; i++) {
      inputElements[i].value = null;
      inputElements[i].classList.remove('form__input-invalid');
    }
    for (i = 0; i < errorElements.length; i++) {
      errorElements[i].classList.add('visually-hidden');
    }
  };

  var quickFormInputs = document.querySelectorAll('.quick-form label input');
  var quickFormErrors = document.querySelectorAll('.quick-form .form__comment');

  formSubmitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    if (isFormValid()) {
      //saveFormData();
      resetForm(quickFormInputs, quickFormErrors);
      //resetFormData();
    } else {
      event.preventDefault();
    }
  });

  var keyCode;

  var Mask = function (event) {
    if (event.keyCode === true) {
      keyCode = event.keyCode;
    }
    var pos = this.selectionStart;
    if (pos < 3) {
      event.preventDefault();
    }
    var matrix = '+7 (___) ___ ____';
    var i = 0;
    var def = matrix.replace(/\D/g, '');
    var val = this.value.replace(/\D/g, '');
    var newValue = matrix.replace(/[_\d]/g, function (a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
    i = newValue.indexOf('_');
    if (i !== -1) {
      if (i < 5) {
        i = 3;
      }
      newValue = newValue.slice(0, i);
    }
    var reg = matrix.substr(0, this.value.length).replace(/_+/g, function (a) {
      return '\\d{1,' + a.length + '}';
    }).replace(/[+()]/g, '\\$&');
    reg = new RegExp('^' + reg + '$');
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
      this.value = newValue;
    }
    if (event.type === 'blur' && this.value.length < 5) {
      this.value = '';
    }
  };

  formPhone.addEventListener('input', Mask, false);
  formPhone.addEventListener('focus', Mask, false);
  formPhone.addEventListener('blur', Mask, false);
  formPhone.addEventListener('keydown', Mask, false);
};

var quickFormSubmitBtn = document.querySelector('.quick-form__submit');

var saveFormData = function () {
  localStorage.setItem('name', document.getElementById('name').value);
  localStorage.setItem('phone', document.getElementById('phone').value);
};

var resetFormData = function () {
  localStorage.removeItem('name', document.getElementById('name').value);
  localStorage.removeItem('phone', document.getElementById('phone').value);
};

quickFormSubmitBtn.addEventListener('submit', saveFormData, true);

setupViewPager();
jsOn();
setupForm();
setupSubscriptionTabs();

