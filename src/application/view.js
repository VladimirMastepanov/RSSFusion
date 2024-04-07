import feedsRender from './feeds-render.js';
import postsRender from './posts-render.js';
import modalWindowView from './modal-window-view.js';

/* eslint-disable no-param-reassign */
const invalidInput = 'is-invalid';

export default (elements, state, uiState, i18n) => (path, curValue) => {
  switch (curValue) {
    case 'filling':
      console.log('do something on filling');
      break;
    case 'filingFailed':
      elements.input.classList.add(invalidInput);
      elements.pAlert.classList.replace('text-success', 'text-danger');
      if (!state.form.valid) {
        elements.pAlert.textContent = i18n.t(state.form.errors);
      } else {
        elements.pAlert.textContent = i18n.t(state.channels.errors);
      }
      console.log('do something on filingFailed');
      break;
    case 'processing':
      elements.pAlert.textContent = '';
      elements.input.classList.remove(invalidInput);
      elements.input.disabled = true;
      elements.submitButton.disabled = true;
      console.log('do something on processing');
      break;
    case 'processed':
      elements.input.disabled = false;
      elements.submitButton.disabled = false;
      elements.pAlert.classList.replace('text-danger', 'text-success');
      elements.pAlert.textContent = i18n.t('rssUploaded');
      elements.feeds.innerHTML = '';
      elements.posts.innerHTML = '';
      feedsRender(state.collection.feeds, i18n);
      postsRender(state.collection.posts, uiState.touchedPosts, i18n);
      elements.form.reset();
      elements.input.focus();
      console.log('do something on processed');
      break;
    case 'postAdded':
      postsRender(state.collection.posts, uiState.touchedPosts, i18n);
      console.log('do something on postAdded');
      break;
    case 'touchedPost':
      modalWindowView(uiState, state.collection.posts);
      console.log('do something on touchedPost');
      break;
    case 'processingFailed':
      elements.input.classList.add(invalidInput);
      elements.pAlert.classList.replace('text-success', 'text-danger');
      elements.pAlert.textContent = i18n.t(state.process.processError);
      elements.input.disabled = false;
      elements.submitButton.disabled = false;
      elements.form.reset();
      elements.input.focus();
      console.log('do something on processingFailed');
      break;
    default:
      break;
  }
};
