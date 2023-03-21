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

  const onDocumentKeydownToCloseBigPicture = (event) => {
    if (isEscapeKey(event)) {
      closeBigPicture();
    }
  }


  /* Открытие модального окна */

  const openBigPicture = () => {

    /* Показ */
    $bigPicture.classList.remove('hidden');


    /* Обработчики закрытия */
    $bigPictureCancel.addEventListener('click', onBigPictureCrossClick);
    $bigPictureCancel.addEventListener('keydown', onBigPictureCrossKeydown);
    document.addEventListener('keydown', onDocumentKeydownToCloseBigPicture);

    $bigPicture.addEventListener('click', (event) => {
      if (!event.target.closest('.big-picture__preview')) {
        closeBigPicture();
      }
    });

  }


  /* Закрытие модального окна */

  const closeBigPicture = () => {
    $bigPicture.classList.add('hidden');

    /* Снятие обработчиков закрытия */
    $bigPictureCancel.removeEventListener('click', onBigPictureCrossClick);
    $bigPictureCancel.removeEventListener('keydown', onBigPictureCrossKeydown);
    document.removeEventListener('keydown', onDocumentKeydownToCloseBigPicture);
  }





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

