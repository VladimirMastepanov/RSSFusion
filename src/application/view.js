import _ from 'lodash';
import feedsRender from './feedsRender.js';
import postsRender from './postsRender.js';
import modalWindowView from './modalWindowView.js';

/* eslint-disable no-param-reassign */
const invalidInput = 'is-invalid';

export default (elements, state, i18n) => (path, curValue) => {
  switch (path) {
    case 'posts':
      postsRender(elements.posts, state.posts, state.uiState.touchedPostsId, i18n);
      break;
    case 'feeds':
      feedsRender(elements.feeds, state.feeds, i18n);
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
        elements.input.classList.remove(invalidInput);
        elements.form.reset();
        elements.input.focus();
      }
      if (curValue === 'errorProcess') {
        elements.input.disabled = false;
        elements.submitButton.disabled = false;
        elements.input.classList.add(invalidInput);
        elements.pAlert.classList.replace('text-success', 'text-danger');
        elements.pAlert.textContent = i18n.t(state.addedFeedProcess.errorMessage);
      }
      break;
    case 'uiState.currentModalWindowId':
      modalWindowView(_.find(state.posts, { id: curValue }));
      break;
    case 'connectionError':
      elements.input.classList.add(invalidInput);
      elements.pAlert.classList.replace('text-success', 'text-danger');
      elements.pAlert.textContent = i18n.t(state.connectionError);
      elements.input.disabled = false;
      elements.submitButton.disabled = false;
      elements.form.reset();
      elements.input.focus();
      break;
    default:
      break;
  }
};
