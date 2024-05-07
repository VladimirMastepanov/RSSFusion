/* eslint-disable no-unused-expressions */
import _ from 'lodash';
import onChange from 'on-change';
import i18next from 'i18next';
import * as yup from 'yup';
import axios from 'axios';
import resources from './locales/index.js';
import view from './view.js';
import parser from './parser.js';
import addIdentification from './addIdentification.js';

const urlBase = () => 'https://allorigins.hexlet.app/get?disableCache=true';

const getUrl = (rssUrl) => {
  const newUrl = new URL(urlBase());
  newUrl.searchParams.set('url', rssUrl);
  return newUrl;
};

const initialState = {
  posts: [],
  feeds: [],
  addedFeedProcess: {
    status: 'filling', // 'processing'
    error: null,
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
          // notOneOf: () => i18n.t('urlTaken')
        },
      });

      const baseSchema = yup.string().url().required();
      const validate = (fields) => {
        const urls = initialState.feeds.map((i) => i.url);
        const actualSchema = baseSchema.notOneOf(urls, i18n.t('urlTaken'));
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
          const links = initialState.feeds.map((feedItem) => feedItem.url);
          // console.log(links)
          const promisesGet = links.map((link) => axios.get(getUrl(link)));
          Promise.all(promisesGet)
            .then((content) => {
              // console.log(content)
              const parsedData = content.map((element) => parser(element.data.contents));
              // console.log(parsedData)
              if (parsedData !== null) {
                parsedData.forEach(([feed, posts]) => {
                  const [feedWithId] = initialState.feeds.filter((item) => item.url === feed.url);
                  const urlPosts = initialState.posts
                    .filter((post) => post.feedsId === feedWithId.id)
                    .map((el) => el.url);
                  const newPosts = posts.filter((p) => !urlPosts.includes(p.url));
                  if (newPosts.length > 0) {
                    const postsForAdd = newPosts.map((postElement) => {
                      const id = _.uniqueId();
                      const newPostElement = { ...postElement, id, feedsId: feedWithId.id };
                      return newPostElement;
                    });
                    state.posts = [...initialState.posts, ...postsForAdd];
                  }
                })
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
          .then((validationMessage) => {
            if (!_.isEmpty(validationMessage)) {
              state.addedFeedProcess.error = validationMessage.message;
            } else {
              state.addedFeedProcess.status = 'processing';
              axios.get(getUrl(inputValue))
                .then((str) => {
                  const receivedData = parser(str.data.contents);
                  if (receivedData === null) {
                    state.addedFeedProcess.error = i18n.t('rssInvalid');
                  } else {
                    const [feed, posts] = addIdentification(receivedData);
                    state.feeds.push(feed);
                    state.posts = [...state.posts, ...posts];
                    state.feedsUrls.push(inputValue);
                    state.addedFeedProcess.status = 'filling';
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
          state.uiState.touchedPostsId.push(targetId);
          state.uiState.currentModalWindowId = targetId;
        }
      });
    });
};

export default app;
