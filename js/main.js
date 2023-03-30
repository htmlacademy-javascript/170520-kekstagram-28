import {createDataForGallery} from './data.js';
import {formGalleryAsFragment} from './gallery.js';
import './img-upload.js';

document.querySelector('.pictures').append(
  formGalleryAsFragment(createDataForGallery(25))
);

