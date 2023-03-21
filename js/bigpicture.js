import {isEnterKey, isEscapeKey} from './util.js';


const initBigPicture = () => {

  const $picturesList = document.querySelectorAll('.picture');
  const $bigPicture = document.querySelector('.big-picture');
  const $bigPictureCancel = document.querySelector('.big-picture__cancel');
  const bigPicturePreview = 'big-picture__preview'; /* Содержимое внутри модалки, но не сама модалка, понадобится внутри target.closest() */


  /* Вспомогательные функции для того чтобы можно было повесить обработчики, СОХРАНИТЬ, а потом снять их */

  const onBigPictureCrossClick = () => {
    closeBigPicture();
  }

  const onBigPictureCrossKeydown = () => {
    if (isEnterKey(event)) {
      closeBigPicture();
    }
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

  const openBigPicture = () => {

    /* Непосредственно показ */
    $bigPicture.classList.remove('hidden');

    /* Логика */


    /* Обработчики закрытия */
    $bigPictureCancel.addEventListener('click', onBigPictureCrossClick);
    $bigPictureCancel.addEventListener('keydown', onBigPictureCrossKeydown);
    $bigPicture.addEventListener('click', onBigPictureOverlayClick);
    document.addEventListener('keydown', onDocumentKeydownToCloseBigPicture);
  }


  /* Закрытие модального окна */

  const closeBigPicture = () => {

    /* Непосредственно скрытие */
    $bigPicture.classList.add('hidden');

    /* Логика */


    /* Снятие обработчиков закрытия */
    $bigPictureCancel.removeEventListener('click', onBigPictureCrossClick);
    $bigPictureCancel.removeEventListener('keydown', onBigPictureCrossKeydown);
    $bigPicture.removeEventListener('click', onBigPictureOverlayClick);
    document.removeEventListener('keydown', onDocumentKeydownToCloseBigPicture);
  }



  /* Вешаем открытие BigPicture на превьюшки */

  [].forEach.call($picturesList, function (element) {
    element.addEventListener('click', () => {
      openBigPicture();
    })
    element.addEventListener('keydown', (event) => {
      if(isEnterKey(event)) {
        openBigPicture();
      }
    })
  });



};

export {initBigPicture};

