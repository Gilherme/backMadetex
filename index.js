var app = require('./config/server.js')
const port = 1039;

const mysql = require('mysql');

// Configurações para a conexão com o banco de dados
const connection = mysql.createConnection({
  host: "db-madetex.ccpmwo68291q.us-east-1.rds.amazonaws.com",
  user: "Guilherme",
  password: 'NPct9Ua4hL68jez667iX',
  database: 'db_madetex',
});


const addColumnQuery = `ALTER TABLE usuarios ADD emailVerificado TINYINT(1) DEFAULT 0;`;

let colunaAdicionada = false;

// Lógica para verificar e adicionar a coluna
if (!colunaAdicionada) {
  connection.connect(err => {
    if (err) {
      console.error('Erro ao conectar: ' + err.stack);
      return;
    }

    console.log('Conexão bem-sucedida.');

    // Executa a consulta para adicionar a coluna
    connection.query(addColumnQuery, (error, results, fields) => {
      if (error) {
        console.error('Erro ao adicionar a coluna: ' + error);
      } else {
        console.log('Coluna adicionada com sucesso.');
        colunaAdicionada = true; // Atualiza a flag para indicar que a coluna foi adicionada
      }

      // Encerra a conexão
      connection.end();
    });
  });
} else {
  console.log('A coluna já foi adicionada anteriormente.');
}

app.listen(port, () => {
  console.log(`servidor on na http://localhost:${port}`)
})