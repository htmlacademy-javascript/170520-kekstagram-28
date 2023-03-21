import {isEnterKey, isEscapeKey} from './util.js';


const initBigPicture = () => {

  const $picturesList = document.querySelectorAll('.picture');
  const $bigPicture = document.querySelector('.big-picture');

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

  document.addEventListener('keydown', (event) => {
    if(isEscapeKey(event)) {
      closeBigPicture();
    }
  });



};

export {initBigPicture};

