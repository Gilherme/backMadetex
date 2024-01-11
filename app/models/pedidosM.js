function pedido(connection){
  this._connection = connection
}

pedido.prototype.criarPedido = function(pedido, callback) {
  this._connection.query('insert into pedidos set ?', pedido, callback)
}

pedido.prototype.getPedido = function(idUser, id, callback) {
  this._connection.query('SELECT * FROM pedidos WHERE ?? = ?', [idUser, id], callback);
}

pedido.prototype.editarPedido = function(id, pedido, callback){
  this._connection.query('UPDATE pedido SET ? WHERE id = ?', [pedido, id], callback)
}

module.exports = function(){
  return pedido
}