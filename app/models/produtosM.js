function prod(connection){
  this._connection = connection
}

prod.prototype.editarProduto = function(id, produto, callback){
  this._connection.query( `UPDATE produtos SET ? WHERE id = ?`, [produto, id], callback)
}
prod.prototype.inserirProduto = function (produto, callback) {
  this._connection.query('insert into produtos set ?', produto, callback)
}
prod.prototype.apagarProduto = function(id, callback){
  this._connection.query('delete from produtos where id = ?', [id], callback)
}

prod.prototype.getTodosProdutos = function (callback){
  this._connection.query('select nome, preco, id, loja from produtos', callback)
}
prod.prototype.getProdutos = function (param, column, limit, callback){
  this._connection.query('SELECT nome, preco, id, loja FROM produtos WHERE ?? = ? LIMIT ?', [column, param, limit], callback);
}
prod.prototype.getProduto = function (id, callback){
  this._connection.query('select * from produtos WHERE id = ?', [id], callback)
}
prod.prototype.getProdutosPorIds = function (ids, callback) {
  this._connection.query('SELECT * FROM produtos WHERE id IN (?)', [ids], callback);
}
prod.prototype.getProdutosPopulares = function (limit, callback){
  this._connection.query(`select nome, preco, id, loja from produtos order by pontos desc limit ?`, [limit], callback)
}
prod.prototype.getProdutosEmOferta = function (limit, callback){
  this._connection.query(`select nome, preco, id, loja from produtos where oferta = 1 limit ?`,[limit] ,callback)
}


prod.prototype.getTodosProdutosPorLoja = function(loja, callback){
  this._connection.query(`select nome, preco, id, loja from produtos where loja = ?`, [loja], callback)
}
prod.prototype.getProdutosPorLojaEcategoria = function (loja, categoria, limit, callback){
  this._connection.query(`select nome, preco, id, loja from produtos WHERE loja = ? and categoria = ? limit ?`, [loja, categoria, limit], callback)
}
prod.prototype.getProdutosPopularesPorLoja = function (loja, limit, callback){
  this._connection.query(`SELECT nome, preco, id, loja FROM produtos WHERE loja = ? ORDER BY pontos DESC LIMIT ?`, [loja, limit], callback)
}
prod.prototype.getProdutosEmOfertaPorLoja = function (loja, limit, callback){
  this._connection.query(`SELECT nome, preco, id, loja FROM produtos WHERE loja = ? AND oferta = 1 limit ?`, [loja, limit], callback)
}
prod.prototype.getProdutosFloja = function (param, column, loja, callback){
  this._connection.query(`select nome, preco, id, loja from produtos WHERE ?? = ? and loja = ?`, [column, param, loja], callback)
}

prod.prototype.getChavesProdutos = function (callback){
  this._connection.query('select * from chaves_pesquisa', callback)
}


module.exports = function(){
  return prod
}
