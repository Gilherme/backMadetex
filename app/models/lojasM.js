function home(connection){
  this._connection = connection
}

home.prototype.getDadosLojaM = function (loja,  callback){
  this._connection.query(`select * from lojas WHERE nome =  ?`,[loja], callback)
}

home.prototype.getTodasAsLojas = function (callback){
  this._connection.query(`select * from lojas`, callback)
}

module.exports = function() {
  return home;
}