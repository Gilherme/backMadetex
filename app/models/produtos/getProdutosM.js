function get(connection){
  this._connection = connection
}

get.prototype.getProdutos = function (loja, callback){
  this._connection.query('select * from produtos WHERE loja = ?', [loja], callback)
}
get.prototype.getProduto = function (id, callback){
  this._connection.query('select * from produtos WHERE id = ?', [id], callback)
}

get.prototype.getMadeiramentos = function (loja, callback){
  this._connection.query('select * from madeiramento WHERE loja = ?',[loja], callback)
}
get.prototype.getMadeiramento = function (id, callback){
  this._connection.query('select * from madeiramento WHERE id = ?',[id], callback)
}

module.exports = function() {
  return get;
}
