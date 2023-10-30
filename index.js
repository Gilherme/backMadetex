var app = require('./config/server.js')
const port = 1039;

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "db-madetex.ccpmwo68291q.us-east-1.rds.amazonaws.com",
  user: "Guilherme",
  password: 'NPct9Ua4hL68jez667iX',
  database: 'db_madetex',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL');
  // Agora você pode realizar operações no banco de dados
});

app.listen(port, () => {
  console.log(`servidor on na ${port}`)
})