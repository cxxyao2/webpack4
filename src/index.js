console.log('index.js is loaded');

import { multi } from './js/test';
import './assets/index.css';

console.log(multi(3, 4));

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
