function del(connection){
  this._connection = connection
}

del.prototype.deleteProduto = function(id, callback){
  this._connection.query('delete from produtos where id = ?', [id], callback)
}

del.prototype.deleteMadeiramento = function(id, callback){
  this._connection.query('delete from madeiramento where id = ?', [id], callback)
}

module.exports = function() {
  return del;
}