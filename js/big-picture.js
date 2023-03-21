import {isEscapeKey} from './util.js';

const $bigPicture = document.querySelector('.big-picture');
const $bigPictureCancel = document.querySelector('.big-picture__cancel');
const bigPicturePreview = 'big-picture__preview'; /* Содержимое внутри модалки, но не сама модалка, понадобится внутри target.closest() */

const $bigPictureImg = document.querySelector('.big-picture__img img');
const $bigPictureLikesCount = document.querySelector('.likes-count');
const $bigPictureCommentsCount = document.querySelector('.comments-count');



/* Вспомогательные функции для того чтобы можно было повесить обработчики, СОХРАНИТЬ, а потом снять их */

const onBigPictureCrossClick = () => {
  closeBigPicture();
}

const onBigPictureOverlayClick = (event) => {
  if (!event.target.closest('.big-picture__preview')) {
    closeBigPicture();
  }
}

const onDocumentKeydownToCloseBigPicture = (event) => {
  if (isEscapeKey(event)) {
    closeBigPicture();
  }
}


/* Открытие модального окна */

const openBigPicture = (url, likes, comments) => {

  /* Непосредственно показ */
  $bigPicture.classList.remove('hidden');

  /* Логика */
  $bigPictureImg.src = url;
  $bigPictureLikesCount.innerText = likes;
  $bigPictureCommentsCount.innerText = comments.length;

  /* Обработчики закрытия -- добавляем */
  $bigPictureCancel.addEventListener('click', onBigPictureCrossClick);
  $bigPicture.addEventListener('click', onBigPictureOverlayClick);
  document.addEventListener('keydown', onDocumentKeydownToCloseBigPicture);
}


/* Закрытие модального окна */

const closeBigPicture = () => {

  /* Непосредственно скрытие */
  $bigPicture.classList.add('hidden');

  /* Логика */


  /* Обработчики закрытия -- снимаем */
  $bigPictureCancel.removeEventListener('click', onBigPictureCrossClick);
  $bigPicture.removeEventListener('click', onBigPictureOverlayClick);
  document.removeEventListener('keydown', onDocumentKeydownToCloseBigPicture);
}


export {openBigPicture};

