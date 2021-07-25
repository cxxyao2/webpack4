// import '@babel/polyfill';

const add = (x, y) => x + y;

console.log(add(2, 5));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Timer is executed...');
    resolve(true);
  }, 1000);
});

console.log(promise);

promise
  .then((value) => console.log('value is ' && value))
  .catch((error) => console.log('error is' && error));

// output
//   7
// Promise { <state>: "pending" }
//   Timer is executed...
//   true
