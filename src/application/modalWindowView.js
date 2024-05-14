export default (currentPost) => {
  const title = document.querySelector('.modal-title');
  title.textContent = currentPost.title;
  const body = document.querySelector('.modal-body');
  body.textContent = currentPost.description;
  const footer = document.querySelector('.modal-footer');
  const a = footer.querySelector('a');
  a.setAttribute('href', currentPost.url);
  const hrefA = document.querySelector(`[data-id="${currentPost.id}"]`);
  hrefA.classList.add('fw-normal');
  hrefA.classList.remove('fw-bold');
};
