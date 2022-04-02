const fs = require("fs-extra");
const path = require("path");

const outputFile = "output.json";

const buildFile = () => {
  const contentFolder = path.resolve("datafiles");
  const dataFolders = fs.readdirSync(contentFolder);

  // begin parsing each folder
  const newData = dataFolders.map((folder, i) => {
    const dataFile = path.resolve(contentFolder, folder, "data.json");

    // be sure the file exists!
    if (fs.pathExistsSync(dataFile)) {
      const jsondata = fs.readJSONSync(dataFile);
      return {
        name: jsondata.name,
        price: jsondata.price
      };
    }
  });

  //filter out null values (from possible missing/empty data files)
  const finalData = newData.filter(item => item);

  fs.writeJSONSync(outputFile, finalData);
  console.log("Success!");
};

buildFile();