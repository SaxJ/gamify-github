'use strict';

module.exports = [
  {
    path: '/post', // the url of the page, example /post/post-slug
    collection: 'posts', // the name of the collection from firestore
    param: 'slug', // the parameter from url, the equivalent of /post/:param
    context: ['slug', 'title', 'description'], // the fields from the collection that will be requested at build time, then you can access the data from this.props.pageContext
    fileName: 'post', // the file from pages folder
  },
  {
    path: '/user', // the url of the page, example /post/post-slug
    collection: 'users', // the name of the collection from firestore
    param: 'email', // the parameter from url, the equivalent of /post/:param
    context: ['email'],
    fileName: 'user', // the file from pages folder
  },
  {
    path: '/stats', // the url of the page, example /post/post-slug
    collection: 'stats', // the name of the collection from firestore
    param: 'id', // the parameter from url, the equivalent of /post/:param
    context: [
      'issues_closed',
      'issues_opened',
      'name',
      'pull_request_closed',
      'pull_request_opened',
      'pull_request_reopened',
      'pull_request_review_submitted',
    ], // the fields from the collection that will be requested at build time, then you can access the data from this.props.pageContext
    fileName: 'stat', // the file from pages folder
  },
];
