/* eslint-disable no-param-reassign */
const invalidInput = 'is-invalid';

export default (elements, state, i18n) => (path, curValue) => {
  switch (curValue) {
    case 'filling':
      console.log('do something on filling');
      break;
    case 'filingFailed':
      elements.input.classList.add(invalidInput);
      if (!state.form.valid) {
        elements.pAlert.textContent = state.form.errors;
      } else {
        elements.pAlert.textContent = state.feeds.errors;
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
      elements.form.disabled = false;
      elements.pAlert.textContent = i18n.t('rssUploaded');
      console.log('do something on processed');
      break;
    default:
      break;
  }
};
