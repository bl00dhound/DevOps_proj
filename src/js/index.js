const title = document.getElementById('title');
const btn = document.getElementById('btn');
const colors = ['tomato', 'khaki', 'black', 'navy', 'blue', 'red', 'yellos', 'green', 'black'];

let counter = 0;

const getRandomColor = array => array[Math.floor(Math.random() * array.length)];

btn.addEventListener('click', () => {
  counter += 1;
  title.innerText = `${counter} click${counter === 1 ? '' : 's'}!`;
  title.style.color = getRandomColor(colors);
});
