import './assets/index.css';

const add = (x, y) => x + y;

console.log(add(2, 5));

if (module.hot) {
  module.hot.accept('./js/print.js', () => {
    // do something
    print(5);
  });
}
