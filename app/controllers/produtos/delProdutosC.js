
module.exports.delProduto = function(app, req, res, id){

  let connection = app.config.dbConnection
  let controleModel = new app.app.models.produtos.delProdutosM(connection)

  controleModel.deleteProduto(id, (err, result) => {
    if (err) {
      console.error('Erro ao deletar produto:', err);
      res.status(500).json({ error: 'Erro ao deletar produto.' });
    } else {
      res.json({ msg: "produto deletado" });
    }
  });
}
module.exports.delMadeiramento = function(app, req, res, id){

  let connection = app.config.dbConnection
  let controleModel = new app.app.models.produtos.delProdutosM(connection)

  controleModel.deleteMadeiramento(id, (err, result) => {
    if (err) {
      console.error('Erro ao deletar produto:', err);
      res.status(500).json({ error: 'Erro ao deletar produto.' });
    } else {
      res.json({ msg: "produto deletado" });
    }
  });
}
