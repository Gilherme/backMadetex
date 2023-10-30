var app = require('./config/server.js')
const port = 1039;



var mysql = require('mysql')

const products = require('./prod.js')

const connection = mysql.createConnection({
  host: "db-madetex.ccpmwo68291q.us-east-1.rds.amazonaws.com",
  user: "Guilherme",
  password: 'NPct9Ua4hL68jez667iX',
  database: 'db_madetex',
});


const query = 'INSERT INTO produtos (nome, descricao, preco, quantidade, categoria, id, loja, desconto, condicao,pontos, pagamento, lista_descricao, galeria, sub_categoria, sub_sub_categoria, madeira, oferta) VALUES ?';

connection.query(query, [products.map(p => [p.nome, p.descricao, p.preco, p.quantidade, p.categoria, p.id, p.loja, p.desconto, p.condicao,
p.pontos, p.pagamento, p.lista_descricao, p.galeria, p.sub_categoria, p.sub_sub_categoria, p.madeira, p.oferta])], (err, result) => {
  if (err) throw err;
  console.log('Produtos inseridos com sucesso');
  connection.end();
});


app.listen(port, () => {
  console.log(`servidor on na http://localhost:${port}`)
})