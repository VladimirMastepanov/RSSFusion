/* eslint-disable no-unused-expressions */
import _ from 'lodash';
import onChange from 'on-change';
import i18next from 'i18next';
import * as yup from 'yup';
import axios from 'axios';
import resources from './locales/index.js';
import view from './view.js';
import elements from './elements.js';
import parser from './parser.js';
import modalWindowView from './modal-window-view.js';

// const testUrl = 'http://lorem-rss.herokuapp.com/feed';

const initialState = {
  addProcess: {
    processState: 'filling', // 'filingFailed' 'processing' 'processed' 'observation' 'processingFailed'
    processError: {},
  },
  form: {
    currentValue: '',
    valid: true,
    errors: '',
  },
  channels: {
    urlCollection: [],
    valid: true,
    errors: [],
  },
  collection: {
    feeds: [],
    posts: [],
    postsTitles: [],
  },
};

const app = () => {
  const i18n = i18next.createInstance();

  i18n
    .init({
      lng: 'ru',
      debug: true,
      resources,
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

      const schema = yup.string().url().required();
      const validate = (fields) => schema
        .validate(fields, { abortEarly: false })
        .then(() => { })
        .catch((e) => {
          const message = {
            message: e.message,
          };
          return message;
        });
      // .catch((e) => ({ [e.path]: e.message }));

      const state = onChange(initialState, view(elements, initialState, i18n));

      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        // console.log(e.target[0].value);
        const { value } = e.target[0];
        const inputValue = value.trim();
        state.form.currentValue = inputValue;
        validate(inputValue)
          .then((error) => {
            !_.isEmpty(error) ? state.form.errors = 'urlInvalid' : state.form.errors = {};
            // console.log(error);
            state.form.valid = _.isEmpty(error);
            if (state.channels.urlCollection.includes(state.form.currentValue)) {
              state.channels.valid = false;
              state.channels.errors = 'repeatedValueError';
            }
            if (!state.form.valid || !state.channels.valid) {
              state.addProcess.processState = 'filingFailed';
            } else {
              state.addProcess.processState = 'processing';
              axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(inputValue)}`)
                .then((str) => parser(str.data.contents))
                .then(([feed, posts]) => {
                  state.collection.feeds.push(feed); // = [...state.collection.feeds, ...feed];
                  state.collection.posts = [...state.collection.posts, ...posts];
                })
                .then(() => {
                  state.channels.urlCollection.push(inputValue);
                  state.form.currentValue = '';
                  state.addProcess.processState = 'processed';
                  state.addProcess.processState = 'observation';
                  const buttons = document.querySelectorAll('[data-bs-toggle=modal]');
                  buttons.forEach((button) => {
                    button.addEventListener('click', (event) => {
                      const targetId = event.target.attributes[1].value;
                      // console.log(event.target.attributes, targetId);
                      modalWindowView(targetId, initialState.collection.posts);
                    });
                  });
                })
                .catch((err) => {
                  // console.log(err);
                  state.addProcess.processError = err;
                  state.addProcess.processState = 'processingFailed';
                });
              // state.feeds.urlCollection.concat(value);
            }
          });
      });
    });
};

export default app;
