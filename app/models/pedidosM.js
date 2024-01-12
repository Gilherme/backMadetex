function pedido(connection){
  this._connection = connection
}

pedido.prototype.criarPedido = function(pedido, callback) {
  this._connection.query('insert into pedidos set ?', pedido, callback)
}

pedido.prototype.getPedido = function(idUser, callback) {
  this._connection.query('SELECT * FROM pedidos WHERE id_user = ?', [idUser], callback);
}

pedido.prototype.getPedidosMaisRecentes = function(idUser, limit, callback) {
  this._connection.query('SELECT * FROM pedidos WHERE id_user = ? ORDER BY data_pedido DESC limit ?', [idUser, limit], callback);
}

pedido.prototype.editarPedido = function(id, pedido, callback){
  this._connection.query('UPDATE pedidos SET ? WHERE id = ?', [pedido, id], callback)
}

module.exports = function(){
  return pedido
}
