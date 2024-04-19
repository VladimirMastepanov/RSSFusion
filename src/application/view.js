import feedsRender from './feeds-render.js';
import postsRender from './posts-render.js';
import modalWindowView from './modal-window-view.js';

/* eslint-disable no-param-reassign */
const invalidInput = 'is-invalid';

export default (elements, state, i18n) => (path, curValue) => {
  switch (curValue) {
    case 'filling':
      break;
    case 'filingFailed':
      elements.input.classList.add(invalidInput);
      elements.pAlert.classList.replace('text-success', 'text-danger');
      if (!state.form.valid) {
        elements.pAlert.textContent = i18n.t(state.form.errors);
      } else {
        elements.pAlert.textContent = i18n.t(state.process.addFeedError);
      }
      break;
    case 'processing':
      elements.pAlert.textContent = '';
      elements.input.classList.remove(invalidInput);
      elements.input.disabled = true;
      elements.submitButton.disabled = true;
      break;
    case 'processed':
      elements.input.disabled = false;
      elements.submitButton.disabled = false;
      elements.pAlert.classList.replace('text-danger', 'text-success');
      elements.pAlert.textContent = i18n.t('rssUploaded');
      elements.feeds.innerHTML = '';
      elements.posts.innerHTML = '';
      feedsRender(elements.feeds, state.collection.feeds, i18n);
      postsRender(elements.posts, state.collection.posts, state.uiState.touchedPosts, i18n);
      elements.form.reset();
      elements.input.focus();
      break;
    case 'postAdded':
      postsRender(elements.posts, state.collection.posts, state.uiState.touchedPosts, i18n);
      break;
    case 'touchedPost':
      modalWindowView(state.uiState, state.collection.posts);
      break;
    case 'processingFailed':
      elements.input.classList.add(invalidInput);
      elements.pAlert.classList.replace('text-success', 'text-danger');
      elements.pAlert.textContent = i18n.t(state.process.addFeedError);
      elements.input.disabled = false;
      elements.submitButton.disabled = false;
      elements.form.reset();
      elements.input.focus();
      break;
    default:
      break;
  }
};
