/* eslint-disable no-unused-expressions */
import _ from 'lodash';
import onChange from 'on-change';
import i18next from 'i18next';
import * as yup from 'yup';
import axios from 'axios';
import resources from './locales/index.js';
import view from './view.js';
import toParse from './toParse.js';

const getUrl = (rssUrl) => {
  const newUrl = new URL('https://allorigins.hexlet.app/get?disableCache=true');
  newUrl.searchParams.set('url', rssUrl);
  return newUrl;
};

const initialState = {
  posts: [],
  feeds: [],
  addedFeedProcess: {
    status: 'filling', // 'processing' 'errorProcess'
    errorMessage: null,
  },
  connectionError: null,
  uiState: {
    touchedPostsId: [],
    currentModalWindowId: null,
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

      const elements = {
        form: document.querySelector('.rss-form'),
        input: document.getElementById('url-input'),
        submitButton: document.getElementById('form-submit-button'),
        pAlert: document.getElementById('message-alert'),
        posts: document.querySelector('.posts'),
        feeds: document.querySelector('.feeds'),
      };

      const state = onChange(initialState, view(elements, initialState, i18n));

      const baseSchema = yup.string().url().required(i18n.t('notEmpty'));

      const validate = (fields) => {
        const actualSchema = baseSchema.notOneOf(state.feeds.map((i) => i.url), i18n.t('urlTaken'));
        return actualSchema
          .validate(fields, { abortEarly: false })
          .then(() => { })
          .catch((e) => {
            const message = {
              message: e.message,
            };
            return message;
          });
      };

      const postsUpdate = () => {
        setTimeout(() => {
          const promisesGet = state.feeds
            .map((feedItem) => feedItem.url)
            .map((link) => axios.get(getUrl(link)));
          Promise.all(promisesGet)
            .then((content) => content
              .map((element) => toParse(element.data.contents))
              .forEach(({ title, items }) => {
                const [feedWithId] = state.feeds
                  .filter((feed) => feed.title === title);
                const urlPosts = state.posts
                  .filter((post) => post.feedsId === feedWithId.id)
                  .map((el) => el.url);
                const newPosts = items.filter((i) => !urlPosts.includes(i.url));
                if (newPosts.length > 0) {
                  const postsForAdd = newPosts.map((postElement) => {
                    const id = _.uniqueId();
                    const newPostElement = { ...postElement, id, feedsId: feedWithId.id };
                    return newPostElement;
                  });
                  state.posts = [...state.posts, ...postsForAdd];
                }
              }))
            .finally(() => postsUpdate());
        }, 5000);
      };

      postsUpdate();

      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(elements.form);
        const formValue = formData.get('url');
        const inputValue = formValue.trim();
        state.addedFeedProcess.status = 'processing';
        validate(inputValue)
          .then((validationMessage) => {
            if (!_.isEmpty(validationMessage)) {
              state.addedFeedProcess.errorMessage = validationMessage.message;
              state.addedFeedProcess.status = 'errorProcess';
            } else {
              axios.get(getUrl(inputValue))
                .then((str) => {
                  try {
                    const receivedData = toParse(str.data.contents);
                    const { title, description, items } = receivedData;
                    const feedsId = _.uniqueId();
                    const feed = {
                      title, description, url: inputValue, id: feedsId,
                    };
                    const posts = items.map((item) => {
                      const itemId = _.uniqueId();
                      return { ...item, feedsId, id: itemId };
                    });
                    state.addedFeedProcess.status = 'filling';
                    state.feeds = [...state.feeds, feed];
                    state.posts = [...state.posts, ...posts];
                  } catch (parserError) {
                    state.addedFeedProcess.errorMessage = i18n.t(parserError.message);
                    state.addedFeedProcess.status = 'errorProcess';
                  }
                })
                .catch((err) => {
                  if (err.message === 'Network Error') {
                    state.connectionError = i18n.t('connectionError');
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
          state.uiState.touchedPostsId = [...state.uiState.touchedPostsId, targetId];
          state.uiState.currentModalWindowId = targetId;
        }
      });
    });
};

export default app;
