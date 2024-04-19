const xmlParser = new DOMParser();

const parser = (xml, format = 'text/xml') => {
  const html = xmlParser.parseFromString(xml, format);
  const errorNode = html.querySelector('parsererror');
  let result;
  if (errorNode) {
    result = null;
  } else {
    result = html;
  }
  return result;
};

export default parser;
