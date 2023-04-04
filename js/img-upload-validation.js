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


pristine.addValidator($hashtags, (hashtags) => {
  const hashtagsAsArray = hashtagsToTrimmedArray(hashtags);
  return !hashtagsAsArray || !hasDuplicates(hashtagsAsArray);
}, 'В хештегах имеются дубликаты');


pristine.addValidator($hashtags, (hashtags) => {
  const hashtagsAsArray = hashtagsToTrimmedArray(hashtags);
  return !hashtagsAsArray || hashtagsAsArray.length <= 5;
}, 'Хештегов не может быть больше пяти');


pristine.addValidator($hashtags, (hashtags) => {
  const hashtagsAsArray = hashtagsToTrimmedArray(hashtags);
  if (!hashtagsAsArray) {
    return true;
  }

  const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

  function isTagValid(hashtag) {
    return hashtagRegExp.test(hashtag)
  }

  return hashtagsAsArray.every(isTagValid);


}, 'Неверный формат');


/* Инициализируем валидацию во время отправки формы */

$imgUploadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const isFormValid = pristine.validate();

  /* eslint-disable-next-line no-alert */
  alert(isFormValid ? 'Можно отправлять' : 'Форма невалидна');

});


