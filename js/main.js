import {createDataForGallery} from './data.js';
import {formGalleryAsFragment} from './gallery.js';
import {initBigPicture} from './big-picture.js';

document.querySelector('.pictures').append(
  formGalleryAsFragment(createDataForGallery(25))
);

initBigPicture();
