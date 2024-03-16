

function config(connection){
  this._connection = connection
}

config.prototype.todasAsChaves = function (callback){
  this._connection.query('select * from chaves_pesquisa', callback)
}
config.prototype.chavesPesquisa = function (callback){
  this._connection.query('select * nome, id from produtos', callback)
}

module.exports = function(){
  return config
}