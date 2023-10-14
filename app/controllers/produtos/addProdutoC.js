
module.exports.adicionarProduto  = function(app, req, res){
  let produto = req.body

  console.log(produto)
  let connection = app.config.dbConnection
  let produtoModel = new app.app.models.produtos.addProdutoM(connection)

  produtoModel.inserirProduto(produto, function(err, result) {
    if(err){
        res.json({mgs: 'erro ao inserir' + err});
    }
    else{
      res.json({msg: 'Produto cadastrado com sucesso'})
    }   
  })
}
module.exports.adicionarMadeiramento  = function(app, req, res){
  let produto = req.body

  let connection = app.config.dbConnection
  let produtoModel = new app.app.models.produtos.addProdutoM(connection)

  produtoModel.inserirMadeiramento(produto, function(err, result) {
    if(err){
        res.json({mgs: 'erro ao inserir' + err});
    }
    else{
      res.json({msg: 'Produto cadastrado com sucesso'})
    }   
  })
}

