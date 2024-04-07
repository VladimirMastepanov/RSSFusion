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

const initialState = {
  process: {
    processState: 'filling', // 'observation' 'filingFailed' 'processing' 'processed' 'postAdded' 'processingFailed' 'touchedPost'
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

const uiState = {
  touchedPosts: [],
  currentModalWindow: '',
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

      const state = onChange(initialState, view(elements, initialState, uiState, i18n));

      const intervalRender = () => {
        setTimeout(() => {
          const links = initialState.channels.urlCollection;
          const promisesGet = links.map((link) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`));
          Promise.all(promisesGet)
            .then((content) => {
              const promiseParser = content.map((element) => parser(element.data.contents));
              Promise.all(promiseParser)
                .then((feedsAndPosts) => {
                  const posts = _.flatten(feedsAndPosts.map((feedAndPost) => feedAndPost[1]));
                  const titles = initialState.collection.posts.map((post) => post.url);
                  const newTitles = posts.map((post) => post.url);
                  const difference = _.difference(titles, newTitles);
                  if (difference.length > 0) {
                    state.channels.posts = posts;
                    state.process.processState = 'postAdded';
                    state.process.processState = 'observation';
                  }
                  intervalRender();
                });
            });
        }, 5000);
      };

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
              state.process.processState = 'filingFailed';
            } else {
              state.process.processState = 'processing';
              axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(inputValue)}`)
                .then((str) => parser(str.data.contents))
                .then(([feed, posts]) => {
                  state.collection.feeds.push(feed); // = [...state.collection.feeds, ...feed];
                  state.collection.posts = [...state.collection.posts, ...posts];
                })
                .then(() => {
                  state.channels.urlCollection.push(inputValue);
                  state.form.currentValue = '';
                  state.process.processState = 'processed';
                  intervalRender();
                  const buttons = document.querySelectorAll('[data-bs-toggle=modal]');
                  buttons.forEach((button) => {
                    button.addEventListener('click', (event) => {
                      const targetId = event.target.attributes[1].value;
                      const hrefA = document.querySelector(`[data-id="${targetId}"]`);
                      const openedPostLink = hrefA.href;
                      uiState.touchedPosts.push(openedPostLink);
                      uiState.currentModalWindow = openedPostLink;
                      state.process.processState = 'touchedPost';
                      state.process.processState = 'observation';
                      // console.log(uiState)
                      // modalWindowView(targetId, initialState.collection.posts, uiState);
                    });
                  });
                })
                .catch((err) => {
                  // console.log(err);
                  state.process.processError = err;
                  state.process.processState = 'processingFailed';
                });
              // state.feeds.urlCollection.concat(value);
            }
          });
      });
    });
};

export default app;
