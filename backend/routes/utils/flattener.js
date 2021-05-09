/**
  * Function to flatten an array into an object with each key being the id of
  * each object in the array.
  * @param {object[]} items
  * @return {object{}}
  */
const flattener = (items) => ({
  ...Object.fromEntries(items.map((item) => [item.id, item])),
});

module.exports = flattener;
