'use strict';

var setupFeedbackPager = function () {
  var prevButton = document.querySelector('.reviews__previous-btn');
  var nextButton = document.querySelector('.reviews__previous-next');
  var slides = document.querySelectorAll('.reviews__slide');
  if (prevButton === null || nextButton === null) {
    return;
  }
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

var setupTrainersPager = function () {
  var deviceTypes = {
    desktop: {
      itemsPerPage: 4,
      class: 'current-desktop'
    },
    tablet: {
      itemsPerPage: 2,
      class: 'current-tablet'
    },
    mobile: {
      itemsPerPage: 1,
      class: 'current-mobile'
    }
  };

  var prevButton = document.querySelector('.trainers__previous-btn');
  var nextButton = document.querySelector('.trainers__previous-next');
  var slides = document.querySelectorAll('.trainers__list > ul > li');
  var currentPage = 0;

  if (prevButton === null || nextButton === null) {
    return;
  }

  nextButton.addEventListener('click', function () {
    currentPage++;
    if (currentPage >= slides.length) {
      currentPage = 0;
    }
    selectCurrentItems(currentPage, slides, deviceTypes.desktop);
    selectCurrentItems(currentPage, slides, deviceTypes.tablet);
    selectCurrentItems(currentPage, slides, deviceTypes.mobile);
  });
  prevButton.addEventListener('click', function () {
    currentPage--;
    if (currentPage < 0) {
      currentPage = slides.length - 1;
    }
    selectCurrentItems(currentPage, slides, deviceTypes.desktop);
    selectCurrentItems(currentPage, slides, deviceTypes.tablet);
    selectCurrentItems(currentPage, slides, deviceTypes.mobile);
  });
};

var selectCurrentItems = function (page, slides, deviceType) {
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove(deviceType.class);
  }

  var pagesCount = slides.length / deviceType.itemsPerPage;
  var normalizedPage = page % pagesCount;
  var firstItem = normalizedPage * deviceType.itemsPerPage;
  var lastItem = firstItem + (deviceType.itemsPerPage - 1);
  for (var slideIndex = firstItem; slideIndex <= lastItem; slideIndex++) {
    slides[slideIndex].classList.add(deviceType.class);
  }
};

var setupSubscriptionTabs = function () {
  var firstTab = document.getElementById('first-tab');
  var secondTab = document.getElementById('second-tab');
  var thirdTab = document.getElementById('third-tab');
  var tabs = document.querySelectorAll('.subscriptions__btn');
  var subscriptions = document.querySelectorAll('.subscriptions__box');
  var currentTab = 0;

  if (firstTab === null || secondTab === null || thirdTab === null) {
    return;
  }

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

    subscriptions[currentTab].classList.remove('current');
    currentTab = selectedTab;
    subscriptions[selectedTab].classList.add('current');
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

  if (formName === null || formPhone === null || phoneError === null || nameError === null) {
    return;
  }

  var validateName = function (inputElement, errorElement) {
    var nameIsValid = /^[a-zA-Z??????-????-?? ]{2,30}$/.test(inputElement.value);
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
      resetForm(quickFormInputs, quickFormErrors);
      resetFormData();
    } else {
      saveFormData();
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

var saveFormData = function () {
  localStorage.setItem('name', document.getElementById('name').value);
  localStorage.setItem('phone', document.getElementById('phone').value);
};

var resetFormData = function () {
  localStorage.removeItem('name', document.getElementById('name').value);
  localStorage.removeItem('phone', document.getElementById('phone').value);
};

setupFeedbackPager();
setupTrainersPager();
jsOn();
setupForm();
setupSubscriptionTabs();
