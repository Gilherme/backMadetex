
module.exports.editarProduto = function(app, req, res){
  const id = req.params.id;
  const produto = req.body

  let connection = app.config.dbConnection
  let controleModel = new app.app.models.produtos.putProdutoM(connection)

  controleModel.editarProduto(id, produto, (err, result) => {
    if (err) {
      console.error('Erro ao editar produto:', err);
      res.status(500).json({ error: 'Erro ao editar produto.' });
    } else {
      res.json({ msg: "produto editado"});
    }
  });
}

module.exports.editarMadeiramento = function(app, req, res, id){

  let connection = app.config.dbConnection
  let controleModel = new app.app.models.produtos.putProdutoM(connection)

  controleModel.editarMadeiramento(id, (err, result) => {
    if (err) {
      console.error('Erro ao editar madeiramento:', err);
      res.status(500).json({ error: 'Erro ao editar madeiramento.' });
    } else {
      res.json({ msg: "madeiramento editado" });
    }
  });
}