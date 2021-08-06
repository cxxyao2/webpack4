import './assets/index.css';
import './assets/box.less';

import print from './js/print';

console.log('index.js is loaded.');

if (module.hot) {
  module.hot.accept('./js/print.js', () => {
    print();
  });
}

// print();

function add(a, b) {
  return a + b;
}
console.log(add(1, 2));
