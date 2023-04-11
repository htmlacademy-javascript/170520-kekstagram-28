import {hasDuplicates} from './util.js';
import {closeImgUpload} from './img-upload.js';

const ALERT_SHOW_TIME = 5000;

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

const setImgUploadFormSubmit = () => {
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
              showSuccessAlert('Изображение успешно загружено');
            } else {
              throw new Error('Отправленные данные невалидны');
            }
          }
        )
        .catch((error) => {
          showErrorAlert(error.message)
        })

    }
  });
};




/* Уведомление Success */

let hideTimeout;

const hideSuccessAlert = (template) => {
  clearTimeout(hideTimeout); /* Если мы в течении ALERT_SHOW_TIME успеваем повторно открыть окно */
  template.remove();
  closeImgUpload();
}

const showSuccessAlert = (message) => {
  const template = document.querySelector('#success').content.querySelector('.success');
  template.querySelector('.success__title').innerText = message;
  template.querySelector('.success__button').addEventListener('click', () => {
    hideSuccessAlert(template);
  });

  document.body.append(template);

  hideTimeout = setTimeout(() => {
    hideSuccessAlert(template);
  }, ALERT_SHOW_TIME);
}


/* Уведомление Error */

const hideErrorAlert = (template) => {
  template.remove();
  closeImgUpload();
}

const retryFromErrorAlert = (template) => {
  template.remove();
  $imgUploadForm.submit(); /* ??? Как будто недовызывается часть кода при повторном сабмите */
  closeImgUpload();
}

const showErrorAlert = (message) => {
  const template = document.querySelector('#error').content.querySelector('.error');
  template.querySelector('.error__title').innerText = message;
  template.querySelector('.error__button--close').addEventListener('click', () => {
    hideErrorAlert(template);
  });
  document.body.append(template);
}

export {setImgUploadFormSubmit};
