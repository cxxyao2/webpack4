console.log('index.js is loaded');

// import { multi } from './js/test';

// lazy loading
// document.getElementById('btn').onclick = function () {
//   import(/* webpackChunkName: 'test' */ './js/test').then(({ multi }) => {
//     console.log(multi(3, 4));
//   });
// };

// preloading
document.getElementById('btn').onclick = function () {
  import(
    /* webpackChunkName: 'test', webpackPrefetch:true  */ './js/test'
  ).then(({ multi }) => {
    console.log(multi(3, 4));
  });
};
