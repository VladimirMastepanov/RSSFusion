export default (postsElements, posts, uiState, i18n) => {
  const cardBorder = document.createElement('div');
  cardBorder.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18n.t('posts');
  cardBody.append(h2);
  cardBorder.append(cardBody);
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  posts.forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    if (uiState.includes(post.id)) {
      a.classList.add('fw-normal');
    } else {
      a.classList.add('fw-bold');
    }
    a.setAttribute('href', post.url);
    a.setAttribute('target', '_blank');
    a.setAttribute('data-id', post.id);
    a.textContent = post.title;

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', post.id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = i18n.t('viewButton');

    li.append(a, button);
    ul.append(li);
  });
  cardBorder.append(ul);
  postsElements.replaceChildren(cardBorder);
};
