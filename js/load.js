fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err);
  });





