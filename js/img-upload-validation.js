import {hasDuplicates} from './util.js';

const $imgUploadForm = document.querySelector('.img-upload__form');
const $hashtags = $imgUploadForm.querySelector('[name="hashtags"]');


/* С хештэгами гораздо удобнее работать, когда они представлены в виде массива: */
const hashtagsToTrimmedArray = (hashtags) => {
  hashtags = hashtags.replace(/\s+/g, ' ').trim(); // Разрешаем пользователю оставлять лишние пробелы
  return hashtags.length ? hashtags.split(' ') : null; // Если после удаления пробелов в строке осталсь данные, то возвращаем её в виде массива
};


/* Инициализация библиотеки pristine */

const pristine = new Pristine($imgUploadForm, {
  classTo:         'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass:      'img-upload__field-wrapper--error',
  errorTextClass:  'img-upload__error-output',
}, false);


/* Ещё одно правило для тегов */

pristine.addValidator($hashtags, function (hashtags) {
  const hashtagsAsArray = hashtagsToTrimmedArray(hashtags);
  if ( ! hashtagsAsArray) {
    return true;
  }
  return !hasDuplicates(hashtagsAsArray);
}, "В хештегах имеются дубликаты");


/* Ещё одно правило для тегов */

pristine.addValidator($hashtags, function (hashtags) {
  const hashtagsAsArray = hashtagsToTrimmedArray(hashtags);
  if (!hashtagsAsArray) {
    return true;
  }
  return hashtagsAsArray.length <= 5;
}, "Хештегов не может быть больше пяти");


/* Ещё одно правило для тегов */

pristine.addValidator($hashtags, function (hashtags) {
  const hashtagsAsArray = hashtagsToTrimmedArray(hashtags);
  if (!hashtagsAsArray) {
    return true;
  }

  let flagIfError = true;
  const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;
  hashtagsAsArray.forEach((hashtag) => {
    if (!hashtagRegExp.test(hashtag)) {
      flagIfError = false;
    }
  });
  return flagIfError;

}, "Неверный формат");


/* Инициализируем валидацию во время отправки формы */

$imgUploadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let isFormValid = pristine.validate();

  if (isFormValid) {
    alert('Можно отправлять');
  } else {
    alert('Форма невалидна');
  }
});


