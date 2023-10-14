var mysql = require('mysql')

let conMysql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '1234',
  database: 'db_madetex',
});

module.exports = function() {
  return conMysql;
};
