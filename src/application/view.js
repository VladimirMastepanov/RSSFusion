import feedsRender from './feedsRender.js';
import postsRender from './posts-render.js';
import modalWindowView from './modalWindow-View.js';

/* eslint-disable no-param-reassign */
const invalidInput = 'is-invalid';

export default (elements, state, i18n) => (path, curValue) => {
  switch (path) {
    case 'posts':
      postsRender(elements.posts, state.posts, state.uiState.touchedPostsId, i18n);
      break;
    case 'addedFeedProcess.status':
      if (curValue === 'processing') {
        elements.pAlert.textContent = '';
        elements.input.classList.remove(invalidInput);
        elements.input.disabled = true;
        elements.submitButton.disabled = true;
      }
      if (curValue === 'filling') {
        elements.input.disabled = false;
        elements.submitButton.disabled = false;
        elements.pAlert.classList.replace('text-danger', 'text-success');
        elements.pAlert.textContent = i18n.t('rssUploaded');
        elements.feeds.innerHTML = '';
        elements.posts.innerHTML = '';
        feedsRender(elements.feeds, state.feeds, i18n);
        postsRender(elements.posts, state.posts, state.uiState.touchedPostsId, i18n);
        elements.form.reset();
        elements.input.focus();
      }
      break;
    case 'uiState.currentModalWindowId':
      modalWindowView(curValue, state.posts);
      break;
    case 'addedFeedProcess.error':
      elements.input.classList.add(invalidInput);
      elements.pAlert.classList.replace('text-success', 'text-danger');
      elements.pAlert.textContent = state.addedFeedProcess.error;
      break;
    case 'connectionError':
      elements.input.classList.add(invalidInput);
      elements.pAlert.classList.replace('text-success', 'text-danger');
      elements.pAlert.textContent = state.connectionError;
      elements.input.disabled = false;
      elements.submitButton.disabled = false;
      elements.form.reset();
      elements.input.focus();
      break;
    default:
      break;
  }
};
