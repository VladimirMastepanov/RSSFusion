const xmlParser = new DOMParser();

const toParse = (xml, format = 'text/xml') => {
  try {
    const html = xmlParser.parseFromString(xml, format);
    const titleFeed = html.querySelector('title');
    const descriptionFeed = html.querySelector('description');
    const title = titleFeed.textContent;
    const description = descriptionFeed.textContent;
    const collection = html.querySelectorAll('item');
    const items = [];
    collection.forEach((item) => {
      const titlePost = item.querySelector('title');
      const urlPost = item.querySelector('link');
      const descriptionPost = item.querySelector('description');
      items.push({
        title: titlePost.textContent,
        url: urlPost.textContent,
        description: descriptionPost.textContent,
      });
    });
    return { title, description, items };
  } catch (e) {
    throw new Error('rssInvalid');
  }
};

export default toParse;
