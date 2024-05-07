import _ from 'lodash';

export default ([feed, posts]) => {
  const feedsId = _.uniqueId();
  const newFeed = { ...feed, id: feedsId };
  const newPosts = posts.map((item) => {
    const itemId = _.uniqueId();
    return { ...item, feedsId, id: itemId };
  });
  return [newFeed, newPosts];
};
