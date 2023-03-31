import {hasDuplicates, hashtagsToArray} from './util.js';

const $imgUploadForm = document.querySelector('.img-upload__form');
const $hashtags = $imgUploadForm.querySelector('[name="hashtags"]');
const $description = $imgUploadForm.querySelector('[name="description"]');


const pristine = new Pristine($imgUploadForm, {
  classTo:         'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass:      'img-upload__field-wrapper--error',
  errorTextClass:  'img-upload__error-output',
});


pristine.addValidator($hashtags, function (hashtags) {
  const hashtagsAsArray = hashtagsToArray(hashtags);
  return !hasDuplicates(hashtagsAsArray);
}, "В хештегах имеются дубликаты");

pristine.addValidator($hashtags, function (hashtags) {
  const hashtagsAsArray = hashtagsToArray(hashtags);
  return hashtagsAsArray.length <= 5;
}, "Хештегов не может быть больше пяти");

pristine.addValidator($hashtags, function (hashtags) {
  const hashtagsAsArray = hashtagsToArray(hashtags);
  const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

  let flag = true;
  hashtagsAsArray.forEach((hashtag) => {
    if( ! hashtagRegExp.test(hashtag)) {
      flag = false;
    }
  });

  return flag;

}, "Неверный формат");



$imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  let isFormValid = pristine.validate();

  if (isFormValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});


