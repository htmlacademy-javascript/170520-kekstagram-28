const $gallerySlot = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');


const renderGallery = (gallery) => {
  console.log(gallery);
  gallery.forEach( ({url, likes, comments}) => {
    const $photo = photoTemplate.cloneNode(true);
    $photo.querySelector('.picture__img').src = url;
    $photo.querySelector('.picture__comments').innerText = comments.length;
    $photo.querySelector('.picture__likes').innerText = likes;
    $gallerySlot.append($photo);
  });
}

export { renderGallery };
