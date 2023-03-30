const imgUploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(imgUploadForm);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    alert('Можно отправлять');
  } else {
    alert('Форма невалидна');
  }
});

