const xmlParser = new DOMParser();

const parser = (xml, format = 'text/xml') => {
  const html = xmlParser.parseFromString(xml, format);
  console.log(html)
  console.log(html.querySelector('parsererror'))
  if (html.querySelector('parsererror')) {
    return null;
  }
  const channelFeed = html.querySelector('title');
  const descriptionFeed = html.querySelector('description');
  const urlFeed = html.querySelector('link');
  const feed = {
    channel: channelFeed.textContent,
    description: descriptionFeed.textContent,
    url: urlFeed.textContent,
  };
  const posts = [];
  const items = html.querySelectorAll('item');
  items.forEach((item) => {
    const titlePost = item.querySelector('title');
    const urlPost = item.querySelector('link');
    const descriptionPost = item.querySelector('description');
    const postItem = {
      title: titlePost.textContent,
      url: urlPost.textContent,
      description: descriptionPost.textContent,
    };
    posts.push(postItem);
  });
  return [feed, posts];
};

export default parser;
