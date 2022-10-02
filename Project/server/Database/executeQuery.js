const dbConfig = require("./dbConfig.json");
const mysql = require("mysql");
module.exports = {
  executeQuery: (sql) => {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(dbConfig);
      con.connect(function (err) {
        if (err) {
          reject(err);
        }
        con.query(sql, function (err, result, fields) {
          if (err) {
            reject(err);
          }
          con.end(() => {
            console.log("Connection ended successfully");
          });
          resolve(result);
        });
      });
    });
  },
};