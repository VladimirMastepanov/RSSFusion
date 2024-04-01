import _ from 'lodash';

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
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const id = _.uniqueId();
    const a = document.createElement('a');
    a.classList.add('fw-bold');
    a.setAttribute('href', post.url);
    a.setAttribute('target', '_blank');
    a.setAttribute('data-id', id);
    a.textContent = post.title;

    const button = document.createElement('button'); // fix button-link
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = i18n.t('viewButton');

    // const modalId = _.uniqueId('modal-');
    // const modalDiv = document.createElement('div');
    // modalDiv.classList.add('modal', 'fade');
    // modalDiv.setAttribute('[tabindex=-1]');
    // modalDiv.setAttribute(`[aria-labelledby=${modalId}]`);
    // modalDiv.setAttribute('[aria-hidden=true]');

    // const modalDialog = document.createElement('div');
    // modalDialog.classList.add('modal-dialog');

    // const modalContent = document.createElement('div');
    // modalContent.classList.add('modal-content');

    // const modalHeader = document.createElement('div');
    // modalHeader.classList.add('modal-header');
    // const h5 = document.createElement('h5');
    // h5.classList.add('modal-title');
    // h5.setAttribute('id', modalId);
    // h5.textContent = post.description;

    // const modalBody = document.createElement('div');
    // modalBody.classList.add('modal-body');

    // const modalFooter = document.createElement('div');
    // modalFooter.classList.add('modal-footer');

    // <div class="modal fade" id="exampleModal" tabindex="-1"
    // aria-labelledby="exampleModalLabel" aria-hidden="true">
    //   <div class="modal-dialog">
    //     <div class="modal-content">
    //       <div class="modal-header">
    //         <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
    //         <button type="button" class="btn-close" data-bs-dismiss="modal"
    // aria-label="Close"></button>
    //       </div>
    //       <div class="modal-body">
    //         ...
    //       </div>
    //       <div class="modal-footer">
    //         <button type="button" class="btn btn-secondary"
    // data-bs-dismiss="modal">Close</button>
    //         <button type="button" class="btn btn-primary">Save changes</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    li.append(a);
    li.append(button);
    ul.append(li);
  });
  cardBorder.append(ul);
  container.append(cardBorder);
};
