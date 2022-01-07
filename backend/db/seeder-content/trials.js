const fs = require("fs");

const getData = async () => {
  let drinks = [];
  fs.readFile("../seeder-content/drinks.json", async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    drinks = JSON.parse(data);
  });
};

getData();
