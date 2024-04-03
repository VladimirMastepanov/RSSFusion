export default (id, coll) => {
  const [post] = coll.filter((el) => el.id === id);
  const title = document.querySelector('.modal-title');
  title.textContent = post.title;
  const body = document.querySelector('.modal-body');
  body.textContent = post.description;
  const footer = document.querySelector('.modal-footer');
  const a = footer.querySelector('a');
  a.setAttribute('href', post.url);
};
