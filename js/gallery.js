/* Формируем разметку галереи. Возвращаем в виде DocumentFragment */
import {openBigPicture} from './big-picture.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const galleryAsFragment = document.createDocumentFragment();

const formGalleryAsFragment = (gallery) => {
  gallery.forEach(({url, likes, comments}) => {
    const photo = photoTemplate.cloneNode(true);
    photo.querySelector('.picture__img').src = url;
    photo.querySelector('.picture__comments').innerText = comments.length; // length массива comments
    photo.querySelector('.picture__likes').innerText = likes;
    galleryAsFragment.append(photo);
    photo.addEventListener('click', () => {
      openBigPicture(url, likes, comments);
    });
  });
  return galleryAsFragment;
};

export { formGalleryAsFragment };
