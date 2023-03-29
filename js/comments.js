/* Формируем разметку комментария. Возвращаем в виде DocumentFragment */

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsAsFragment = document.createDocumentFragment();

const formCommentsAsFragment = (comments) => {
  comments.forEach((commentItem) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = commentItem.avatar;
    comment.querySelector('.social__picture').alt = commentItem.name;
    comment.querySelector('.social__text').innerText = commentItem.message;
    commentsAsFragment.append(comment);
  });
  return commentsAsFragment;
};

export { formCommentsAsFragment };
