const assert = require('assert');

const getRandomColor = array => array[Math.floor(Math.random() * array.length)];

describe('Test general', () => {
  it('should return one of items', () => {
    const testArray = ['one', 'two', 'three'];
    assert.equal(testArray.includes(getRandomColor(testArray)), true);
  });
});
