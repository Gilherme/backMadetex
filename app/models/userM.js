function user(connection){
  this._connection = connection
}

user.prototype.cadastrarUser = function (usuario, callback) {
  this._connection.query('insert into usuarios set ?', usuario, callback)
}
user.prototype.verificarUser = function (email, callback) {
  this._connection.query('SELECT COUNT(*) AS count FROM usuarios WHERE email = ?', [email], callback)
}
user.prototype.verificarUsuario = function (email, callback) {
  this._connection.query('SELECT * FROM usuarios WHERE email = ?', [email], callback)
}
user.prototype.usuarioPorId = function (id, callback){
  this._connection.query('SELECT * FROM usuarios WHERE id = ?', [id], callback)
}
user.prototype.userPorEmail = function (email, callback){
  this._connection.query('SELECT * FROM usuarios WHERE email = ?', [email], callback)
}
user.prototype.atualizarUsuario = function (userAtualizado, id, callback){
  this._connection.query( `UPDATE usuarios SET ? WHERE id = ?`, [userAtualizado, id], callback)
}
user.prototype.alterarSenha = function (senha, email, id, callback){
  this._connection.query( `UPDATE usuarios SET senha = ? WHERE email = ?`, [senha, email], callback)
}

user.prototype.addAoCarrinho = function(produto, callback) {
  this._connection.query('insert into carrinho set ?', produto, callback)
}
user.prototype.qtdProdutosNoCarrinho = function(usuarioId, callback) {
  this._connection.query('SELECT COUNT(*) FROM carrinho WHERE usuario_ID = ?', [usuarioId], callback)
}
user.prototype.produtosNoCarrinho = function(usuarioId, callback){
  this._connection.query('SELECT * from  carrinho where usuario_ID = ?', [usuarioId], callback)
}
user.prototype.apagarItemNoCarrinho = function(id, callback){
  this._connection.query('DELETE FROM carrinho WHERE id = ?', [id], callback)
}
user.prototype.editarItemNoCarrinho = function(produtoAtualizado, id, callback){
  this._connection.query('UPDATE carrinho SET ? WHERE id = ?', [produtoAtualizado, id], callback)
}

user.prototype.cadastrarEndereco = function(endereco, callback) {
  this._connection.query('insert into enderecos set ?', endereco, callback)
}
user.prototype.enderecoPorId = function (id, callback){
  this._connection.query('SELECT * FROM enderecos WHERE id_usuario = ?', [id], callback)
}
user.prototype.enderecoPorIds = function (idEnde, idUser, callback){
  this._connection.query('SELECT * FROM enderecos WHERE id = ? AND id_usuario = ?', [idEnde, idUser], callback)
}
user.prototype.editarEndereco = function(endereco, id, callback){
  this._connection.query('UPDATE enderecos SET ? WHERE id = ?', [endereco, id], callback)
}
user.prototype.apagarEndereco = function(id, idUser, callback){
  this._connection.query('DELETE FROM enderecos WHERE id = ? AND id_usuario = ?', [id, idUser], callback)
}

module.exports = function(){
  return user
}