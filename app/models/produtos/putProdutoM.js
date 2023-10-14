
function put(connection){
  this._connection = connection
}

put.prototype.editarProduto = function(id,produto, callback){
  this._connection.query( `UPDATE produtos SET ? WHERE id = ?`, [produto, id], callback)
}

// put.prototype.puteteMadeiramento = function(id, callback){
//   this._connection.query('putete from madeiramento where id = ?', [id], callback)
// }

module.exports = function() {
  return put;
}

