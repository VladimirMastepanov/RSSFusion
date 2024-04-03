// import _ from 'lodash';

export default (container, posts, i18n) => {
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
    // const id = _.uniqueId();
    // const modalId = _.uniqueId('modal-');

    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const a = document.createElement('a');
    a.classList.add('fw-bold');
    a.setAttribute('href', post.id);
    a.setAttribute('target', '_blank');
    a.setAttribute('data-id', post.id);
    a.textContent = post.title;

    const button = document.createElement('button'); // fix modal box
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', post.id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = i18n.t('viewButton');

    // const modalDiv = document.createElement('div');
    // modalDiv.classList.add('modal', 'fade');
    // modalDiv.setAttribute('tabindex','-1');
    // modalDiv.setAttribute('aria-labelledby', modalId);
    // modalDiv.setAttribute('aria-hidden', 'true');

    // const modalDialog = document.createElement('div');
    // modalDialog.classList.add('modal-dialog');

    // const modalContent = document.createElement('div');
    // modalContent.classList.add('modal-content');

    // const modalHeader = document.createElement('div');
    // modalHeader.classList.add('modal-header');
    // const h5 = document.createElement('h5');
    // h5.classList.add('modal-title');
    // h5.setAttribute('id', modalId);
    // h5.textContent = post.title;
    // const closeButtonHead = document.createElement('button');
    // closeButtonHead.classList.add('btn-close');
    // closeButtonHead.setAttribute('data-bs-dismiss', 'modal');
    // closeButtonHead.setAttribute('aria-label', 'Close');
    // modalHeader.append(h5, closeButtonHead);

    // const modalBody = document.createElement('div');
    // modalBody.classList.add('modal-body');
    // const pBody = document.createElement('p');
    // pBody.textContent = post.description;
    // modalBody.append(pBody);

    // const modalFooter = document.createElement('div');
    // modalFooter.classList.add('modal-footer');
    // const linkA = document.createElement('a');
    // linkA.setAttribute('type', 'button');
    // linkA.setAttribute('data-bs-dismiss','modal');
    // linkA.classList.add('btn', 'btn-secondary');
    // linkA.value = i18n.t('reedAllPost');
    // linkA.setAttribute('href', post.url);
    // linkA.setAttribute('target', '_blank');
    // const closeButtonFooter = document.createElement('button');
    // closeButtonFooter.classList.add('btn', 'btn-primary');
    // closeButtonFooter.setAttribute('type', 'button');
    // closeButtonFooter.value = i18n.t('closeButton');
    // modalFooter.append(linkA, closeButtonFooter);

    // modalContent.append(modalHeader, modalBody, modalFooter);
    // modalDialog.append(modalContent);
    // modalDiv.append(modalDialog);

    li.append(a, button);
    ul.append(li);
  });
  cardBorder.append(ul);
  container.append(cardBorder);
};
