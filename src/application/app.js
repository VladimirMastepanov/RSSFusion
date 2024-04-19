/* eslint-disable no-unused-expressions */
import _ from 'lodash';
import onChange from 'on-change';
import i18next from 'i18next';
import * as yup from 'yup';
import axios from 'axios';
import resources from './locales/index.js';
import view from './view.js';
import parser from './parser.js';
import objectFormation from './object-formation.js';

const initialState = {
  process: {
    addFeedProcess: 'filling', // 'filingFailed' 'processing' 'processed'  'processingFailed'
    addPostProcess: 'waiting', // 'postAdded'
    viewingPostProcess: 'waiting', // 'touchedPost'
    addFeedError: '',
  },
  form: {
    valid: true,
    errors: '',
  },
  collection: {
    urlCollection: [],
    uniqueUrlMessage: '',
    feeds: [],
    posts: [],
    postsTitles: [],
  },
  uiState: {
    touchedPosts: [],
    currentModalWindow: '',
  },
};

const urlBase = () => 'https://allorigins.hexlet.app/get?disableCache=true';

const getUrl = (rssUrl) => {
  const newUrl = new URL(urlBase());
  newUrl.searchParams.set('url', rssUrl);
  return newUrl;
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

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.getElementById('url-input'),
    submitButton: document.getElementById('form-submit-button'),
    pAlert: document.getElementById('message-alert'),
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
  };

  const state = onChange(initialState, view(elements, initialState, i18n));

  const intervalRender = () => {
    setTimeout(() => {
      const links = initialState.collection.urlCollection;
      const promisesGet = links.map((link) => axios.get(getUrl(link)));
      Promise.all(promisesGet)
        .then((content) => {
          const htmlCollections = content.map((element) => parser(element.data.contents));
          const feedsAndPosts = htmlCollections.map((html) => objectFormation(html));
          const posts = _.flatten(feedsAndPosts.map((feedAndPost) => feedAndPost[1]));
          const titles = initialState.collection.posts.map((post) => post.url);
          const newTitles = posts.map((post) => post.url);
          const difference = _.difference(titles, newTitles);
          if (difference.length > 0) {
            state.collection.posts = posts;
            state.process.addPostProcess = 'postAdded';
            state.process.addPostProcess = 'waiting';
          }
        });
      intervalRender();
    }, 5000);
  };

  intervalRender();

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(elements.form);
    const formValue = formData.get('url');
    const inputValue = formValue.trim();
    validate(inputValue)
      .then((ValidationMessage) => {
        !_.isEmpty(ValidationMessage) ? state.form.errors = 'urlInvalid' : state.form.errors = {};
        state.form.valid = _.isEmpty(ValidationMessage);
        if (state.collection.urlCollection.includes(inputValue)) {
          state.process.addFeedError = 'repeatedValueError';
          state.process.addFeedProcess = 'filingFailed';
          state.process.addFeedProcess = 'filling';
        } else if (!state.form.valid || (state.collection.uniqueUrlMessage !== '')) {
          state.process.addFeedProcess = 'filingFailed';
          state.process.addFeedProcess = 'filling';
        } else {
          state.process.addFeedProcess = 'processing';
          axios.get(getUrl(inputValue))
            .then((str) => {
              const html = parser(str.data.contents);
              if (html === null) {
                state.process.addFeedError = 'rssInvalid';
                state.process.addFeedProcess = 'processingFailed';
                state.process.addFeedProcess = 'filling';
              } else {
                const [feed, posts] = objectFormation(html);
                state.collection.feeds.push(feed); // = [...state.collection.feeds, ...feed];
                state.collection.posts = [...state.collection.posts, ...posts];
                state.collection.urlCollection.push(inputValue);
                state.process.addFeedProcess = 'processed';
                state.process.addFeedProcess = 'filling';
              }
            })
            .catch((err) => {
              if (err.message === 'Network Error') {
                state.process.addFeedError = 'connectionError';
                state.process.addFeedProcess = 'processingFailed';
                state.process.addFeedProcess = 'filling';
              }
            });
        }
      });
  });

  const postsContainer = document.getElementById('posts-container');
  postsContainer.addEventListener('click', (ev) => {
    const button = ev.target;
    if (button.tagName === 'BUTTON') {
      const targetId = button.attributes[1].value;
      const hrefA = document.querySelector(`[data-id="${targetId}"]`);
      const openedPostLink = hrefA.href;
      state.uiState.touchedPosts.push(openedPostLink);
      state.uiState.currentModalWindow = openedPostLink;
      state.process.viewingPostProcess = 'touchedPost';
      state.process.viewingPostProcess = 'waiting';
    }
  });
};

export default app;
