module.exports.getProdutos = function(app, req, res){
  const loja = req.query.loja

  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtos.getProdutosM(connection)

  produtosModel.getProdutos(loja, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}
module.exports.getProduto = function(app, req, res){
  const id = req.query.id

  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtos.getProdutosM(connection)

  produtosModel.getProduto(id, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}

module.exports.getMadeiramentos = function(app, req, res){
  const loja = req.body.loja

  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtos.getProdutosM(connection)

  produtosModel.getMadeiramentos(loja,(err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}
module.exports.getMadeiramento = function(app, req, res){
  const id = req.body.id

  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtos.getProdutosM(connection)

  produtosModel.getMadeiramento(id,(err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}


