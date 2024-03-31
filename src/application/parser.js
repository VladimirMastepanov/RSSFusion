import _ from 'lodash';

// _.uniqueId('contact_');
// => 'contact_104'

// _.uniqueId();
// => '105'
const xmlParser = new DOMParser();

const parser = (xml, format = 'text/xml') => {
  const html = xmlParser.parseFromString(xml, format);
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
    const title = item.querySelector('title');
    const url = item.querySelector('link');

    const obj = {
      title: title.textContent,
      url: url.textContent,
      feedsId,
    };
    posts.push(obj);
  });
  // console.log(posts)
  // console.log(channel, description.textContent);
  // console.log(items);
  return [feed, posts];
};

export default parser;
