function user(connection){
  this._connection = connection
}

user.prototype.cadastrarUser = function (produto, callback) {
  this._connection.query('insert into clientes set ?', produto, callback)
}

user.prototype.verificarUser = function (email, callback) {
  this._connection.query('SELECT COUNT(*) AS count FROM clientes WHERE email = ?', [email], callback)
}

module.exports = function(){
  return user
}