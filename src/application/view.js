import feedsRender from './feeds-render.js';
import postsRender from './posts-render.js';

/* eslint-disable no-param-reassign */
const invalidInput = 'is-invalid';

export default (elements, state, i18n) => (path, curValue) => {
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
    case 'processingFailed':
      console.log('do something on processingFailed');
      break;
    case 'processed':
      elements.input.disabled = false;
      elements.submitButton.disabled = false;
      elements.pAlert.classList.replace('text-danger', 'text-success');
      elements.pAlert.textContent = i18n.t('rssUploaded');
      elements.feeds.innerHTML = '';
      elements.posts.innerHTML = '';
      feedsRender(elements.feeds, state.collection.feeds, i18n);
      postsRender(elements.posts, state.collection.posts, i18n);
      elements.form.reset();
      elements.input.focus();
      console.log('do something on processed');
      break;
    default:
      break;
  }
};
