export default (uiState, coll) => {
  const [post] = coll.filter((el) => el.url === uiState.currentModalWindow);
  const title = document.querySelector('.modal-title');
  title.textContent = post.title;
  const body = document.querySelector('.modal-body');
  body.textContent = post.description;
  const footer = document.querySelector('.modal-footer');
  const a = footer.querySelector('a');
  a.setAttribute('href', post.url);
  const hrefA = document.querySelector(`[data-id="${post.id}"]`);
  // console.log(hrefA);
  hrefA.classList.add('fw-normal');
  hrefA.classList.remove('fw-bold');
};
