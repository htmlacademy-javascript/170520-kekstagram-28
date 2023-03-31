import {validateHashtagsString} from './hashtags-validation.js'

const $imgUploadForm = document.querySelector('.img-upload__form');
const $hashtags = $imgUploadForm.querySelector('[name="hashtags"]');
const $description = $imgUploadForm.querySelector('[name="description"]');


const pristine = new Pristine($imgUploadForm);

$imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  let hashtagValidationResults;
  let isHashtagsValid;
  let isFormValid;

  /* Валидация хештегов */

  /**
   * Со стороны модуля валидации хештегов пустые строки и строки состоящие из пробелов -- это ошибки.
   * Он написан довольно однозначно, работает конкретно строками и в обоих случаях будет возвращать false.
   * Но на уровне валидации формы мы в первую очередь опираемся на наличие атрибута required */

  /* Если атрибут не установлен, и у нас пустая строка (Пробелы тримим. Пусть будут если пользователь их случайно ввёл. Перед отправкой на бэк подчистим): */
  if( ! $hashtags.hasAttribute('required') && ! $hashtags.value.trim().length ) {
    /* Значит валидация пройдена, и никакие проверки тегов на формат запускать не нужно.
       Довольствуемся пустым полем: */
    isHashtagsValid = true;
  }
  else {
    /* Иначе у нас либо есть условие required, либо введены значение которые нужно проверить, либо и то и другое сразу.
       В таком случае надо запускать полную проверку, и сохранять информацию об ошибках: */
    hashtagValidationResults = validateHashtagsString($hashtags.value);
    isHashtagsValid = hashtagValidationResults.status;
  }


  /* Валидация всей остальной формы */
  isFormValid = pristine.validate();

  if (isFormValid && isHashtagsValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});


