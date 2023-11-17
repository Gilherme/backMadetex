var mysql = require('mysql')

// let conMysql = mysql.createConnection({
//   host: "db-madetex.ccpmwo68291q.us-east-1.rds.amazonaws.com",
//   user: "Guilherme",
//   password: 'NPct9Ua4hL68jez667iX',
//   database: 'db_madetex',
// });

let conMysql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '1234',
    database: 'db_madetex',
  });

module.exports = function() {
  return conMysql;
};
