module.exports = (items) => ({
  ...Object.fromEntries(items.map((item) => [item.id, item])),
});
