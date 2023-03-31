import {isEscapeKey} from './util.js';

const $body = document.querySelector('body');
const $uploadFile = document.querySelector('#upload-file');
const $imgUploadOverlay = document.querySelector('.img-upload__overlay');
const $imgUploadCancel = document.querySelector('.img-upload__cancel');


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

  /* Обработчики закрытия: снимаем */
  $imgUploadCancel.removeEventListener('click', onImgUploadCrossClick);
  $imgUploadOverlay.removeEventListener('click', onImgUploadOverlayClick);
  document.removeEventListener('keydown', onDocumentKeydownToCloseImgUpload);
};


/* Инициализация загрузки изображения */
$uploadFile.addEventListener('change', openImgUpload);

