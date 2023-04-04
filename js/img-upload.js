import {isEscapeKey} from './util.js';

const $body = document.querySelector('body');
const $uploadFile = document.querySelector('#upload-file');
const $imgUploadOverlay = document.querySelector('.img-upload__overlay');
const $imgUploadCancel = document.querySelector('.img-upload__cancel');
const $imgUploadForm = document.querySelector('.img-upload__form');
const $userImage = document.querySelector('.img-upload__preview img');
const $scaleValue = document.querySelector('.scale__control--value');
let currentZoom = +$scaleValue.value.replace('%', '');
const zoom = {
  'MIN': 25,
  'MAX': 100,
  'STEP': 25
};
const $scaleUp = document.querySelector('.scale__control--bigger');
const $scaleDown = document.querySelector('.scale__control--smaller');
const $filters = document.querySelectorAll('.effects__radio');
let currentFilter;
const cssFilters = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness'
};

const $imgUploadSlider = document.querySelector('.img-upload__effect-level');
const $slider = document.querySelector('.effect-level__slider');
const $sliderValue = document.querySelector('.effect-level__value');

const applyZoom = (value) => {
  $userImage.style.transform = `scale(${value / 100})`;
  $scaleValue.value = `${value}%`;
  if (value === zoom.MAX) {
    $scaleUp.disabled = true;
    $scaleDown.disabled = false;
  } else if (value === zoom.MIN) {
    $scaleDown.disabled = true;
    $scaleUp.disabled = false;
  } else {
    $scaleDown.disabled = false;
    $scaleUp.disabled = false;
  }
};

const showSlider = () => {
  $imgUploadSlider.classList.add('img-upload__effect-level--visible');
};

const hideSlider = () => {
  $imgUploadSlider.classList.remove('img-upload__effect-level--visible');
};

/* Вспомогательные функции для того чтобы можно было повесить обработчики, СОХРАНИТЬ, а потом снять их */
/* eslint-disable no-use-before-define */
const onImgUploadCrossClick = () => {
  closeImgUpload();
};

const onImgUploadOverlayClick = (event) => {
  if (!event.target.closest('.img-upload__inner-wrapper')) {
    closeImgUpload();
  }
};

const onDocumentKeydownToCloseImgUpload = (event) => {
  if (isEscapeKey(event)) {
    closeImgUpload();
  }
};

const onClickToScaleControlDown = () => {
  if (currentZoom > zoom.MIN) {
    currentZoom = currentZoom - zoom.STEP;
    applyZoom(currentZoom);
  }
};

const onClickToScaleControlUp = () => {
  if (currentZoom < zoom.MAX) {
    currentZoom = currentZoom + zoom.STEP;
    applyZoom(currentZoom);
  }
};

const onFilterChange = () => {
  $filters.forEach((filter) => {
    if (filter.checked) {
      currentFilter = filter.value;
    }
  });

  /* Удаляем все классы начинающиеся с effects__preview-- */
  const classesToRemove = Array.from($userImage.classList).filter((className) => className.startsWith('effects__preview--'));
  classesToRemove.forEach((className) => {
    $userImage.classList.remove(className);
  });

  /* Добавляем выбранный класс на фотку */
  $userImage.classList.add(`effects__preview--${currentFilter}`);

  /* Обновляем слайдер под выбранный фильтр */
  if (currentFilter === 'none') {
    hideSlider();
    $sliderValue.value = '';
    $userImage.style.filter = 'none';
  }
  if (currentFilter === 'chrome') {
    showSlider();
    $slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        }
      }
    });
  }
  if (currentFilter === 'sepia') {
    showSlider();
    $slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        }
      }
    });
  }
  if (currentFilter === 'marvin') {
    showSlider();
    $slider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 100
      },
      start: 100,
      step: 1,
      format: {
        to: function (value) {
          return `${value.toFixed()}%`;
        },
        from: function (value) {
          return parseFloat(value);
        }
      }
    });
  }
  if (currentFilter === 'phobos') {
    showSlider();
    $slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1,
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return `${value.toFixed(0)}px`;
          }
          return `${value.toFixed(1)}px`;
        },
        from: function (value) {
          return parseFloat(value);
        }
      }
    });
  }
  if (currentFilter === 'heat') {
    showSlider();
    $slider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1,
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        }
      }
    });
  }

};
/* eslint-enable */


/* Открытие модального окна */

const openImgUpload = () => {

  /* Непосредственно показ */
  $imgUploadOverlay.classList.remove('hidden');
  $body.classList.add('modal-open');


  /* Логика */
  applyZoom(currentZoom);
  $scaleDown.addEventListener('click', onClickToScaleControlDown);
  $scaleUp.addEventListener('click', onClickToScaleControlUp);


  /* Создаём дефолтный слайдер. Значения сейчас не важны */
  noUiSlider.create($slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 1,
    step: 1,
    connect: 'lower'
  });

  /* Связываем его со скрытым полем и применяем эффект на изображение */
  $slider.noUiSlider.on('update', () => {
    $sliderValue.value = $slider.noUiSlider.get();
    $userImage.style.filter = `${cssFilters[currentFilter]}(${$slider.noUiSlider.get()})`;
  });


  /* Фильтры */
  $filters.forEach((filter) => {
    filter.addEventListener('change', onFilterChange);
  });

  /* Вызываем сразу же, один раз, чтобы применить текущие правила выбранного в HTML фильтра. */
  onFilterChange();

  /* Обработчики закрытия: добавляем */
  $imgUploadCancel.addEventListener('click', onImgUploadCrossClick);
  $imgUploadOverlay.addEventListener('click', onImgUploadOverlayClick);
  document.addEventListener('keydown', onDocumentKeydownToCloseImgUpload);
};


/* Закрытие модального окна */

const closeImgUpload = () => {

  /* Непосредственно скрытие */
  $imgUploadOverlay.classList.add('hidden');
  $body.classList.remove('modal-open');


  /* Логика: резетим форму */
  $scaleDown.removeEventListener('click', onImgUploadCrossClick);
  $scaleUp.removeEventListener('click', onClickToScaleControlUp);

  $filters.forEach((filter) => {
    filter.removeEventListener('change', onFilterChange);
  });

  /* Резетим форму при закрытии */
  $imgUploadForm.reset();
  $userImage.classList.remove(`effects__preview--${currentFilter}`);
  $slider.noUiSlider.destroy();
  hideSlider();

  /* Обработчики закрытия: снимаем */
  $imgUploadCancel.removeEventListener('click', onImgUploadCrossClick);
  $imgUploadOverlay.removeEventListener('click', onImgUploadOverlayClick);
  document.removeEventListener('keydown', onDocumentKeydownToCloseImgUpload);
};


/* Инициализация загрузки изображения */
$uploadFile.addEventListener('change', openImgUpload);


/* Отмена Esc во время печати */

const $hashtags = document.querySelector('.text__hashtags');
const $description = document.querySelector('.text__description');

[$hashtags, $description].forEach((element) => {
  element.addEventListener('keydown', (event) => {
    if (isEscapeKey(event)) {
      event.stopPropagation();
    }
  });
});
