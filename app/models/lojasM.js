function home(connection){
  this._connection = connection
}

home.prototype.getDadosLojaM = function (loja,  callback){
  this._connection.query(`select * from lojas WHERE nome =  ?`,[loja], callback)
}

module.exports = function() {
  return home;
}