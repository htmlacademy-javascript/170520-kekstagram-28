import './img-upload.js';
import './img-upload-validation.js';
import {createDataForGallery} from './data.js';
import {formGalleryAsFragment} from './gallery.js';

document.querySelector('.pictures').append(
  formGalleryAsFragment(createDataForGallery(25))
);

