export default (currentModalWindowId, coll) => {
  const [post] = coll.filter((el) => el.id === currentModalWindowId);
  const title = document.querySelector('.modal-title');
  title.textContent = post.title;
  const body = document.querySelector('.modal-body');
  body.textContent = post.description;
  const footer = document.querySelector('.modal-footer');
  const a = footer.querySelector('a');
  a.setAttribute('href', post.url);
  const hrefA = document.querySelector(`[data-id="${post.id}"]`);
  hrefA.classList.add('fw-normal');
  hrefA.classList.remove('fw-bold');
};
