import _ from 'lodash';
import axios from 'axios';
import elements from './elements.js';
import postsRender from './posts-render.js';
import parser from './parser.js';

const intervalRender = (state, i18n) => {
  setTimeout(() => {
    const links = state.channels.urlCollection;
    const data = state.collection.posts;
    const promisesGet = links.map((link) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`));
    Promise.all(promisesGet)
      .then((content) => {
        const promiseParser = content.map((element) => parser(element.data.contents));
        Promise.all(promiseParser)
          .then((feedsAndPosts) => {
            const posts = _.flatten(feedsAndPosts.map((feedAndPost) => feedAndPost[1]));
            console.log(posts);
            console.log(data);
            // const difference = _.difference()
            postsRender(elements.posts, _.flatten(data), i18n);
            intervalRender(state, i18n);
          });
      });
  }, 5000, state, i18n);
};

// const renderPostsInterval = (state, i18n) => {
//   const links = state.channels.urlCollection;
//   const data = state.collection.posts;
//   const promisesGet = links.map((link) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`));
//   Promise.all(promisesGet)
//     .then((content) => {
//       const promiseParser = content.map((element) => parser(element.data.contents));
//       Promise.all(promiseParser)
//         .then((feedsAndPosts) => {
//           const posts = _.flatten(feedsAndPosts.map((feedAndPost) => feedAndPost[1]));
//           console.log(posts);
//           console.log(data);
//           // const difference = _.difference()
//           postsRender(elements.posts, _.flatten(data), i18n);
//           intervalRender(state, i18n);
//         });
//     });
// };

export default intervalRender;
