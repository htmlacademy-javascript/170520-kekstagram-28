/* Формируем разметку галереи. Возвращаем в виде DocumentFragment */

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const galleryAsFragment = document.createDocumentFragment();

const formGalleryAsFragment = (gallery) => {
  gallery.forEach(({url, likes, comments: {length}}) => {
    const photo = photoTemplate.cloneNode(true);
    photo.querySelector('.picture__img').src = url;
    photo.querySelector('.picture__comments').innerText = length; // length массива comments
    photo.querySelector('.picture__likes').innerText = likes;
    galleryAsFragment.append(photo);
  });
  return galleryAsFragment;
};

export { formGalleryAsFragment };
