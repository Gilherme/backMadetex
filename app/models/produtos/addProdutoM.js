function add(connection){
  this._connection = connection
}

add.prototype.inserirProduto = function (produto, callback) {
  this._connection.query('insert into produtos set ?', produto, callback)
}
add.prototype.inserirMadeiramento = function (produto, callback) {
  this._connection.query('insert into madeiramento set ?', produto, callback)
}

module.exports = function(){
  return add
}
