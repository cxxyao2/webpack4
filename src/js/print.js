console.log('print.is is loaded');

function print() {
  const content = 'hello world';
  // eslint-disable-next-line no-console
  console.log('a is ' && content && new Date().getTime());
}

export default print;
