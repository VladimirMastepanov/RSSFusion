import _ from 'lodash';

export default (html) => {
  const channel = html.querySelector('title');
  const description = html.querySelector('description');
  const feedsId = _.uniqueId();
  const feed = {
    channel: channel.textContent,
    description: description.textContent,
    id: feedsId,
  };
  const posts = [];
  const items = html.querySelectorAll('item');
  items.forEach((item) => {
    const postId = _.uniqueId();
    const title = item.querySelector('title');
    const url = item.querySelector('link');
    const descriptionPost = item.querySelector('description');

    const obj = {
      title: title.textContent,
      url: url.textContent,
      description: descriptionPost.textContent,
      feedsId,
      id: postId,
    };
    posts.push(obj);
  });
  return [feed, posts];
};
