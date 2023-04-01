import {isEscapeKey} from './util.js';
import {formCommentsAsFragment} from './comments.js';

const $body = document.querySelector('body');
const $bigPicture = document.querySelector('.big-picture');
const $bigPictureCancel = document.querySelector('.big-picture__cancel');
const $bigPictureImg = document.querySelector('.big-picture__img img');
const $bigPictureLikesCount = document.querySelector('.likes-count');
const $bigPictureCommentsCount = document.querySelector('.comments-count');
const $bigPictureDescription = document.querySelector('.social__caption');
const $bigPictureComments = document.querySelector('.social__comments');
const $bigPictureAllCommentsCount = document.querySelector('.social__comment-count');
const $bigPictureCommentsLoader = document.querySelector('.comments-loader');


/* Вспомогательные функции для того чтобы можно было повесить обработчики, СОХРАНИТЬ, а потом снять их */
/* eslint-disable no-use-before-define */
const onBigPictureCrossClick = () => {
  closeBigPicture();
};

const onBigPictureOverlayClick = (event) => {
  if (!event.target.closest('.big-picture__preview')) {
    closeBigPicture();
  }
};

const onDocumentKeydownToCloseBigPicture = (event) => {
  if (isEscapeKey(event)) {
    closeBigPicture();
  }
};
/* eslint-enable */


/* Открытие модального окна */

const openBigPicture = (galleryItem) => {

  /* Непосредственно показ */
  $bigPicture.classList.remove('hidden');
  $body.classList.add('modal-open');
  $bigPictureAllCommentsCount.classList.add('hidden'); /* Временно скрываем, позже сделаем загрузку комментов */
  $bigPictureCommentsLoader.classList.add('hidden'); /* Временно скрываем, позже сделаем загрузку комментов */

  /* Логика: картинка */
  $bigPictureImg.src = galleryItem.url;
  $bigPictureLikesCount.innerText = galleryItem.likes;
  $bigPictureCommentsCount.innerText = galleryItem.comments.length;
  $bigPictureDescription.innerText = galleryItem.description;

  /* Логика: комментарии */
  $bigPictureComments.innerHTML = ''; /* Удаляем захардкоденные комментарии в вёрстке */
  $bigPictureComments.append(
    formCommentsAsFragment(galleryItem.comments)
  );

  /* Обработчики закрытия: добавляем */
  $bigPictureCancel.addEventListener('click', onBigPictureCrossClick);
  $bigPicture.addEventListener('click', onBigPictureOverlayClick);
  document.addEventListener('keydown', onDocumentKeydownToCloseBigPicture);
};


/* Закрытие модального окна */

const closeBigPicture = () => {

  /* Непосредственно скрытие */
  $bigPicture.classList.add('hidden');
  $body.classList.remove('modal-open');
  $bigPictureAllCommentsCount.classList.remove('hidden'); /* Временно скрывали, позже, возможно что-то нужно будет делать с этим элементом */
  $bigPictureCommentsLoader.classList.remove('hidden'); /* Временно скрывали, позже, возможно что-то нужно будет делать с этим элементом */

  /* Здесь могло бы быть удаление логики, но повторное открытие модалки всё-равно перезапишет всё внутри. Ничего не делаем. */

  /* Обработчики закрытия: снимаем */
  $bigPictureCancel.removeEventListener('click', onBigPictureCrossClick);
  $bigPicture.removeEventListener('click', onBigPictureOverlayClick);
  document.removeEventListener('keydown', onDocumentKeydownToCloseBigPicture);
};


export {openBigPicture};

