import {isEnterKey, isEscapeKey} from './util.js';


const initBigPicture = () => {

  const $picturesList = document.querySelectorAll('.picture');
  const $bigPicture = document.querySelector('.big-picture');
  const $bigPictureCancel = document.querySelector('.big-picture__cancel');
  const bigPicturePreview = 'big-picture__preview'; /* Содержимое внутри модалки, но не сама модалка, понадобится внутри target.closest() */

  /* Открытие */

  const openBigPicture = () => {
    $bigPicture.classList.remove('hidden');
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


  /* Закрытие */

  const closeBigPicture = () => {
    $bigPicture.classList.add('hidden');
  }

  $bigPictureCancel.addEventListener('click', () => {
    closeBigPicture();
  });

  $bigPictureCancel.addEventListener('keydown', (event) => {
    if( isEnterKey(event)) {
      closeBigPicture();
    }
  });

  $bigPicture.addEventListener('click', (event) => {
    if( ! event.target.closest('.big-picture__preview') ) {
      closeBigPicture();
    }
  });

  document.addEventListener('keydown', (event) => {
    if(isEscapeKey(event)) {
      closeBigPicture();
    }
  });


};

export {initBigPicture};

