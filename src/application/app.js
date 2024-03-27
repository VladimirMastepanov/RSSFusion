/* eslint-disable no-unused-expressions */
import _ from 'lodash';
import onChange from 'on-change';
import i18next from 'i18next';
import ru from './locales/ru.js';
import validate from './validate.js';

const invalidInput = 'is-invalid';

const initialState = {
  addProcess: {
    processState: 'filling', // 'filingFailed' 'processing' 'processed' 'processingFailed'
    processError: {},
  },
  form: {
    currentValue: '',
    valid: true,
    errors: {},
  },
  feeds: {
    feedsCollection: [],
    valid: true,
    errors: {},
  },
};

const app = () => {
  const i18n = i18next.createInstance();
  i18n
    .init({
      lng: 'ru',
      debug: true,
      resources: ru,
    })
    .then((t) => { t('key'); });

  const form = document.querySelector('.rss-form');
  const input = document.getElementById('url-input');
  const div = form.parentElement;
  const p = div.querySelector('.feedback');

  const state = onChange(initialState, (path, curValue) => {
    switch (curValue) {
      case 'filling':
        console.log('do something on filling');
        break;
      case 'filingFailed':
        input.classList.add(invalidInput);
        // eslint-disable-next-line max-len
        !initialState.form.valid ? p.textContent = initialState.form.errors : p.textContent = initialState.feeds.errors;
        console.log('do something on filingFailed');
        break;
      case 'processing':

        console.log('do something on processing');
        break;
      case 'processingFailed':
        console.log('do something on processingFailed');
        break;
      case 'processed':
        console.log('do something on processed');
        p.textContent = i18n.t('rssUploaded');
        break;
      default:
        break;
    }
  });

  input.addEventListener('input', () => {
    // const { value } = e.target;
    // state.currentValue = value;
    // const errors = validate(value);
    // state.form.errors = errors[''].message;
    // state.form.valid = _.isEmpty(errors);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { value } = e.target;
    state.currentValue = value;
    const errors = validate(value);
    state.form.errors = errors[''].message;
    state.form.valid = _.isEmpty(errors);
    if (state.feeds.feedsCollection.includes(value)) {
      state.feeds.valid = false;
      state.feeds.errors = i18n.t('repeatedValueError');
    }
    if (!state.form.valid || !state.feeds.valid) {
      state.addProcess.processState = 'filingFailed';
    } else {
      state.addProcess.processState = 'processing';
    }
  });
};

export default app;
