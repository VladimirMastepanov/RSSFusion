const form = document.querySelector('.rss-form');
const input = document.getElementById('url-input');
const submitButton = form.querySelector('button');
const divForm = form.parentElement;
const pAlert = divForm.querySelector('.feedback');
const posts = document.querySelector('.posts');
const feeds = document.querySelector('.feeds');

export default {
  form,
  input,
  submitButton,
  pAlert,
  posts,
  feeds,
};
