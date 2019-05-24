const fs = require("fs");
const path = require("path");
const defaultData = require("./defaultData");

const clientes = defaultData;
const data = JSON.stringify(clientes);
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function(err) {
  err
    ? console.log(err)
    : console.log("Base de dados padrão foi criada com sucesso.");
});
