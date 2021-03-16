const fs = require("fs");

const getData = async () => {
  // const drinks [];
  fs.readFile("../seeder-content/drinks.json", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data.toString());
  });
}

getData();
