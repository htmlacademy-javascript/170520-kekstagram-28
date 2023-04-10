import './img-upload.js';
import './img-upload-validation.js';

import {createLoader} from './load.js';
import {formGalleryAsFragment} from './gallery.js';


const loadGallery = createLoader((data) => {
  document.querySelector('.pictures').append(
    formGalleryAsFragment(data)
  )
}, alert);

loadGallery();



