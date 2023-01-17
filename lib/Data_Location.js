//GUA LEXXY SUKA SKR
//SIMPLE KEREN RAPIH
//CREATED BY LEXXY OFFICIAL

const fs = require("fs");

JSON_DATA = {
  db_user: JSON.parse(fs.readFileSync("./database/pengguna.json")),
  db_menfes: JSON.parse(fs.readFileSync("./database/menfess.json")),
};

exports.db_user_JSON = JSON_DATA.db_user;
