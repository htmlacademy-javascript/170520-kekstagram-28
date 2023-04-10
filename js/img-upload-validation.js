import {hasDuplicates, showAlert} from './util.js';

const $imgUploadForm = document.querySelector('.img-upload__form');
const $hashtags = $imgUploadForm.querySelector('[name="hashtags"]');
const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;


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


/* Добавляем кастомные правила на валидацию тегов */

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
  return !hashtagsAsArray || hashtagsAsArray.every((hashtag) => hashtagRegExp.test(hashtag));
}, 'Неверный формат');


/* Инициализируем валидацию во время отправки формы */

const setImgUploadFormSubmit = (onSuccess) => {
  $imgUploadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const isFormValid = pristine.validate();

    if (isFormValid) {

      const formData = new FormData(event.target);

      fetch('https://28.javascript.pages.academy/kekstagram', {
        method: 'post',
        credentials: 'same-origin',
        body: formData
      })
        .then((response) => {
            if(response.ok) {
              onSuccess()
            } else {
              showAlert('Ошибка отправки1')
            }
          }
        )
        .catch((error) => {
          showAlert('Ошибка отправки2')
        })

    }
  });
};

export {setImgUploadFormSubmit};
