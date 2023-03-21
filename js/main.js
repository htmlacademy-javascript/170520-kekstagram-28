import {createDataForGallery} from './data.js';
import {formGalleryAsFragment} from './gallery.js';
import {initBigPicture} from './bigpicture.js';

document.querySelector('.pictures').append(
  formGalleryAsFragment(createDataForGallery(25))
);

initBigPicture();
