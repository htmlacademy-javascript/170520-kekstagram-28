import {createDataForGallery} from './data.js';
import {formGalleryAsFragment} from './gallery.js';

document.querySelector('.pictures').append(
  formGalleryAsFragment(createDataForGallery(25))
)
