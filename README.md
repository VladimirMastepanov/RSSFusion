[![Maintainability](https://api.codeclimate.com/v1/badges/8c954f54421857af5f76/maintainability)](https://codeclimate.com/github/VladimirMastepanov/frontend-project-11/maintainability)


[Try it now! :arrow_forward:](https://frontend-project-11-iota-neon.vercel.app/ "Follow the link to try it")
___
### [RSSFusion](https://frontend-project-11-iota-neon.vercel.app/ "Follow the link to try it") – Browser-Based RSS Feed Aggregator
**RSSFusion** is a browser-based RSS feed aggregator designed to collect and organize news from multiple RSS sources in one place. The application allows users to manage an unlimited number of RSS feeds, which are periodically updated to pull in new posts.

This project was intentionally built without using **async/await** to deepen the developer's understanding of JavaScript's asynchronous behavior. It demonstrates the use of callbacks and promises for handling asynchronous requests, making it a valuable example of effective asynchronous programming.
<img width="997" alt="Снимок экрана 2024-09-14 в 13 19 39" src="https://github.com/user-attachments/assets/8be15b56-4043-4956-a08e-416c28c40998">

---
#### Why This Project?
The purpose of RSSFusion is to explore JavaScript's asynchronous nature without relying on *async/await*. By using traditional approaches like promises and callbacks, the project enhances understanding of event loops, non-blocking I/O, and asynchronous workflows.

---

#### Features
* **Unlimited RSS Feeds**: Users can add an unlimited number of RSS feeds to aggregate news from various sources.
* **Real-Time Updates**: The application periodically fetches updates, adding new posts to the feed if they are available.
* **Automatic Refreshing**: Feeds are automatically refreshed, ensuring the latest content is always available.
* **Multi-Language Support**: The interface supports multiple languages via i18next.
* **Modern UI**: Built with Bootstrap for a responsive and user-friendly interface.


#### Usage
* Add new RSS feed URLs.
* Automatically receive updates as new posts are published by the RSS feeds.

#### Technologies Used
* **Axios** – For making HTTP requests to fetch RSS feed data.
* **i18next** – For internationalization (i18n) support.
* **Bootstrap** – For building responsive user interfaces.
* **Lodash** – Utility library for easier manipulation of objects and arrays.
* **Yup** – For form validation.
* **Webpack** – For bundling and building the application.

#### Development Tools
* **ESLint** *(Airbnb config)* – Enforces consistent code style and quality.
* **Webpack Dev Server** – For serving the application during development.
* **Babel** – Transpiles modern JavaScript for compatibility.

---
#### [Try it](https://frontend-project-11-iota-neon.vercel.app/ "Follow the link to try it")
---
