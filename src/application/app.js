/* eslint-disable no-unused-expressions */
import _ from 'lodash';
import onChange from 'on-change';
import i18next from 'i18next';
import * as yup from 'yup';
// import axios from 'axios';
import ru from './locales/ru.js';
import view from './view.js';
import elements from './elements.js';

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

const schema = yup.string().url().required();
const validate = (fields) => schema
  .validate(fields, { abortEarly: false })
  .then(() => { })
  .catch((e) => ({ [e.path]: e.message }));

const app = () => {
  const i18n = i18next.createInstance();

  i18n
    .init({
      lng: 'ru',
      debug: true,
      resources: ru,
    })
    .then((t) => {
      t('key');
      yup.setLocale({
        mixed: {
          default: () => i18n.t('defaultError'),
        },
        string: {
          url: () => i18n.t('urlInvalid'),
        },
      });

      const state = onChange(initialState, view(elements, initialState, i18n));

      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
        const { value } = e.target[0];
        state.currentValue = value;
        validate(value)
          .then((error) => {
            console.log(error);
            !_.isEmpty(error) ? state.form.errors = error[''].message : state.form.errors = {};
            console.log(error);
            state.form.valid = _.isEmpty(error);
            if (state.feeds.feedsCollection.includes(value)) {
              state.feeds.valid = false;
              state.feeds.errors = i18n.t('repeatedValueError');
            }
            if (!state.form.valid || !state.feeds.valid) {
              state.addProcess.processState = 'filingFailed';
            } else {
              state.addProcess.processState = 'processing';
              state.feeds.feedsCollection.concat(value);
            }
          });
      });
    });
};

export default app;
