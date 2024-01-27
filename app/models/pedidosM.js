function pedido(connection){
  this._connection = connection
}

pedido.prototype.criarPedido = function(pedido, callback) {
  this._connection.query('insert into pedidos set ?', pedido, callback)
}
pedido.prototype.getPedido = function(idUser, callback) {
  this._connection.query('SELECT * FROM pedidos WHERE id_user = ?', [idUser], callback);
}
pedido.prototype.getUltimosPedidos = function(limit, callback) {
  this._connection.query('SELECT * FROM pedidos ORDER BY data_pedido DESC limit ?', [limit], callback);
}
pedido.prototype.getPedidosPorStatus = function(status, limit, callback) {
  this._connection.query('SELECT * FROM pedidos WHERE status = ? limit ?', [status, limit], callback);
}
pedido.prototype.getPedidosMaisRecentes = function(idUser, limit, callback) {
  this._connection.query('SELECT * FROM pedidos WHERE id_user = ? ORDER BY data_pedido DESC limit ?', [idUser, limit], callback);
}
pedido.prototype.editarPedido = function(id, pedido, callback){
  this._connection.query('UPDATE pedidos SET ? WHERE id = ?', [pedido, id], callback)
}
pedido.prototype.criarPedidoProduto = function(produto, callback){
  this._connection.query('insert into pedido_produto set ?', produto, callback)
}

pedido.prototype.getProdutosDoPedido = function(id, callback){
  this._connection.query('SELECT * FROM pedido_produto WHERE pedido_id = ?', [id], callback);
}

module.exports = function(){
  return pedido
}
