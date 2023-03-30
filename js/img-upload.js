import {hasDuplicates} from './util.js';

const $imgUploadForm = document.querySelector('.img-upload__form');
const $hashtags = document.querySelector('.text__hashtags');


const validateHashtagsString = (hashtags) => {

  /* Будет возвращать объект с состоянием (прошла ли валидация или нет), и если нет, то массив ошибок */
  let result = {
    status: true,
    errors: []
  };

  /* Сразу проверка на пустоту */
  if ( ! hashtags.length ) {
    result.status = false;
    result.errors.push('Хештеги не введены');

    /* Если хештеги не введены, то других ошибок уже точно не будет и можно сделать return.
     * Более того если return не сделать, то на пустую строку в дальнейшем будет агриться формат хештегов */
    return result;
  }


  /* Будем разрешать пользователю ошибаться в пробелах и текстовых резделителях.
   * Например двойной пробел между тегами, или пробел в конце строки -- не проблема. */
  hashtags = hashtags.replace(/\s+/g, ' ').trim();

  /* Ещё раз проверка на пустоту. Могло получиться так, что прилетело просто два пробела*/
  if ( !hashtags.length) {
    result.status = false;
    result.errors.push('Вместо хештегов введены пробельные символы');

    /* Опять имеем дело с пустой строкой, и по-итогу и других ошибок дальше уже точно не будет. Можно сделать return, но в этот раз с другой ошибкой.
     * Более того если return не сделать, то на пустую строку в дальнейшем будет агриться формат хештегов */
    return result;
  }


  /* Разбираем строку в массив, чтобы проверить каждое слово по отдельности
   * Будет копить ошибки в массиве result.errors */

  const hashtagsAsArray = hashtags.split(' ');

  /* 1) Первое правило: не больше пяти хештегов */
  if( hashtagsAsArray.length > 5 ) {
    result.status = false;
    result.errors.push('Хештегов не может быть больше пяти');
  }

  /* 2) Второе правило: не позволяем дубликаты */
  if( hasDuplicates(hashtagsAsArray) ) {
    result.status = false;
    result.errors.push('В хештегах имеются дубликаты');
  }

  /* 3) Валидности хештега по правилам из ТЗ */
  const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

  hashtagsAsArray.forEach((hashtag) => {
    if ( ! hashtagRegExp.test(hashtag)) {
      result.status = false;
      result.errors.push('Неверный формат хештега: ' + hashtag);
    }
  });

  return result;

}

const pristine = new Pristine($imgUploadForm);

$imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  let isValid;

  /* Валидация всей формы */
  // isValid = pristine.validate();

  /* Валидация хештегов */
  // if($hashtags.value.length ) {
    let hashtagStatus = validateHashtagsString($hashtags.value);
  // }

  console.log(hashtagStatus);


  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});


