import {hasDuplicates, hashtagsToArray} from './util.js';

const $imgUploadForm = document.querySelector('.img-upload__form');
const $hashtags = $imgUploadForm.querySelector('[name="hashtags"]');

/* Инициализация библиотеки pristine */
const pristine = new Pristine($imgUploadForm, {
  classTo:         'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass:      'img-upload__field-wrapper--error',
  errorTextClass:  'img-upload__error-output',
}, false);


pristine.addValidator($hashtags, function (hashtags) {
  const hashtagsAsArray = hashtagsToArray(hashtags);
  if (hashtagsAsArray) {
    return !hasDuplicates(hashtagsAsArray);
  }
}, "В хештегах имеются дубликаты");

pristine.addValidator($hashtags, function (hashtags) {
  const hashtagsAsArray = hashtagsToArray(hashtags);
  if (hashtagsAsArray) {
    return hashtagsAsArray.length <= 5;
  }
}, "Хештегов не может быть больше пяти");

pristine.addValidator($hashtags, function (hashtags) {
  const hashtagsAsArray = hashtagsToArray(hashtags);
  if (hashtagsAsArray) {
    let flagIfError = true;
    const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;
    hashtagsAsArray.forEach((hashtag) => {
      if (!hashtagRegExp.test(hashtag)) {
        flagIfError = false;
      }
    });
    return flagIfError;
  }
}, "Неверный формат");


$imgUploadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let isFormValid = pristine.validate();

  if (isFormValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});


