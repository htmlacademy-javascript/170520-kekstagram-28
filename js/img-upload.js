import {isEscapeKey} from './util.js';

const $body = document.querySelector('body');
const $uploadFile = document.querySelector('#upload-file');
const $imgUploadOverlay = document.querySelector('.img-upload__overlay');
const $imgUploadCancel = document.querySelector('.img-upload__cancel');
const $imgUploadForm = document.querySelector('.img-upload__form');


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
/* eslint-enable */


/* Открытие модального окна */

const openImgUpload = () => {

  /* Непосредственно показ */
  $imgUploadOverlay.classList.remove('hidden');
  $body.classList.add('modal-open');

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
  $imgUploadForm.reset();

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
