function contato(connection){
  this._connection = connection
}

contato.prototype.enviarMensagem = function (mensagem, callback) {
  this._connection.query('insert into mensagems set ?', mensagem, callback)
}

contato.prototype.getMensagem = function (userId, callback) {
  this._connection.query('SELECT * FROM mensagems WHERE user_id = ?', [userId], callback)
}

module.exports = function(){
  return contato
}