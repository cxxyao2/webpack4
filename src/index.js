console.log('index.js is loaded');
// import './assets/index.css';
// 因为在webpack.config.js中配置了resolve，此时路径可以简写为
import '$css/index.css';

import { multi } from './js/test';
import $ from 'jquery';

console.log(multi(3, 4));
console.log($);

// register serviceworker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('sw is registered.');
      })
      .catch(() => console.log('sw cannot be registered.'));
  });
}
