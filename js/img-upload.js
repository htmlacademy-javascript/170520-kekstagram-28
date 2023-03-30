import {validateHashtagsString} from './hashtags-validation.js'

const $imgUploadForm = document.querySelector('.img-upload__form');
const $hashtags = $imgUploadForm.querySelector('.text__hashtags');


const pristine = new Pristine($imgUploadForm);

$imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  /* Валидация всей формы */
  let isFormValid = pristine.validate();

  /* Валидация хештегов */
  let hashtagValidation = validateHashtagsString($hashtags.value);
  
  if (isFormValid && hashtagValidation.status) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});


