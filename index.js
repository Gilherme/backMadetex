var app = require('./config/server.js')
const port = 1039;



var mysql = require('mysql')

const chaves = require('./chaves.js')
const dadosLojas = require('./dadosLojas.js')

console.log(chaves)

const connection = mysql.createConnection({
  host: "db-madetex.ccpmwo68291q.us-east-1.rds.amazonaws.com",
  user: "Guilherme",
  password: 'NPct9Ua4hL68jez667iX',
  database: 'db_madetex',
});


const queryLoja = 'INSERT INTO lojas (nome, cnpj, endereco, telefone, whatsapp, link_da_pagina, regiao_frete_gratis, cidades_frete_gratis, email, banner, mapa) VALUES ?';

connection.query(queryLoja, [dadosLojas.map(p => [p.nome, p.cnpj, p.endereco, p.telefone, p.whatsapp, p.link_da_pagina, p.regiao_frete_gratis, p.cidades_frete_gratis, p.email,
p.banner, p.mapa])], (err, result) => {
  if (err) throw err;
  console.log('lojas inseridas com sucesso');
  connection.end();
});

const queryChaves = 'INSERT INTO chaves_pesquisa (chave, param, local) VALUES ?';

connection.query(queryChaves, [chaves.map(p => [p.chave, p.param, p.local])], (err, result) => {
    if (err) throw err;
    console.log('chaves inseridas com sucesso');
    connection.end();
  });


app.listen(port, () => {
  console.log(`servidor on na http://localhost:${port}`)
})