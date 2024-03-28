const form = document.querySelector('.rss-form');
const input = document.getElementById('url-input');
const submitButton = form.querySelector('button');
const div = form.parentElement;
const pAlert = div.querySelector('.feedback');

export default {
  form,
  input,
  submitButton,
  pAlert,
};
