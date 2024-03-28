/* eslint-disable no-unused-expressions */
import _ from 'lodash';
import onChange from 'on-change';
import i18next from 'i18next';
import * as yup from 'yup';
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

const app = () => {
  const i18n = i18next.createInstance();
  i18n
    .init({
      lng: 'ru',
      debug: true,
      resources: ru,
    })
    .then((t) => { t('key'); });

  yup.setLocale({
    // mixed: {
    //   default: i18n.t('defaultError'),
    // },
    string: {
      url: i18n.t('urlInvalid'),
    },
  });
  const schema = yup.string().required(i18n.t('urlInvalid')).url(); // Сообщение об ошибке на английском языке
  const validate = (fields) => schema
    .validate(fields, { abortEarly: false })
    .then(() => {})
    .catch((e) => ({ [e.path]: e.message }));

  const state = onChange(initialState, view(elements, initialState, i18n));

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const { value } = e.target[0];
    console.log(value);
    state.currentValue = value;
    const errors = validate(value)
      .then((content) => content);
    console.log(errors);
    !_.isEmpty(errors) ? state.form.errors = errors[''].message : state.form.errors = {};
    state.form.valid = _.isEmpty(errors);
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
};

export default app;
