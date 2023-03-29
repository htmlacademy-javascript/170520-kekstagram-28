/* Формируем разметку галереи. Возвращаем в виде DocumentFragment */
import {openBigPicture} from './big-picture.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const galleryAsFragment = document.createDocumentFragment();

const formGalleryAsFragment = (gallery) => {
  gallery.forEach((galleryItem) => {
    const photo = photoTemplate.cloneNode(true);
    photo.querySelector('.picture__img').src = galleryItem.url;
    photo.querySelector('.picture__comments').innerText = galleryItem.comments.length; // length массива comments
    photo.querySelector('.picture__likes').innerText = galleryItem.likes;
    galleryAsFragment.append(photo);
    photo.addEventListener('click', () => {
      openBigPicture(galleryItem);
    });
  });
  return galleryAsFragment;
};

export { formGalleryAsFragment };
