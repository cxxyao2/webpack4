import print from './js/print';
import $ from 'jquery';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line;
console.log(sum(1, 2, 3));

// eslint-disable-next-line;
console.log('hello');

console.log(print(2));

console.log($);

// webpackChunkName: bundled output file name
import(/* webpackChunkName: 'test' */ './js/test')
  .then((result) => {
    console.log('test.js ok', result);
  })
  .catch((error) => console.log('test.js loading failed'));
