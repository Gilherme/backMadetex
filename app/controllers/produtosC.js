
module.exports.adicionarProduto  = function(app, req, res){
  let produto = req.body

  let connection = app.config.dbConnection
  let produtoModel = new app.app.models.produtosM(connection)

  produtoModel.inserirProduto(produto, function(err, result) {
    if(err){
        res.json({mgs: 'erro ao inserir' + err});
    }
    else{
      res.json({msg: 'Produto cadastrado com sucesso'})
    }   
  })
}
module.exports.editarProduto = function(app, req, res){
  const id = req.params.id;
  const produto = req.body

  let connection = app.config.dbConnection
  let controleModel = new app.app.models.produtosM(connection)

  controleModel.editarProduto(id, produto, (err, result) => {
    if (err) {
      console.error('Erro ao editar produto:', err);
      res.status(500).json({ error: 'Erro ao editar produto.' });
    } else {
      res.json({ msg: "produto editado"});
    }
  });
}
module.exports.getTodosProdutos = function(app, req, res){

  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtosM(connection)

  produtosModel.getTodosProdutos((err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}
module.exports.getProdutos = function(app, req, res){
  const param = req.query.param
  const column = req.query.column
  const limit = parseInt(req.query.limit)
 
  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtosM(connection)

  produtosModel.getProdutos(param, column, limit, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
};
module.exports.getProdutosPorLoja = function(app, req, res, next){
  const loja = req.query.loja
  const categoria = req.query.categoria

  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtosM(connection)

  produtosModel.getProdutosPorLoja(loja, categoria, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}
module.exports.getProduto = function(app, req, res){
  const id = req.query.id

  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtosM(connection)

  produtosModel.getProduto(id, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}
module.exports.getProdutosPopulares = function(app, req, res){
  const limite = req.query.limit
  const limit = parseInt(limite)

  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtosM(connection)

  produtosModel.getProdutosPopulares(limit, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}
module.exports.getProdutosEmOferta = function(app, req, res){
  const limite = req.query.limit
  const limit = parseInt(limite) 

  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtosM(connection)

  produtosModel.getProdutosEmOferta(limit, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}

module.exports.getProdutosFloja = function(app, req, res){
  const param = req.query.param
  const column = req.query.column
  const loja = req.query.loja

  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtosM(connection)

  produtosModel.getProdutosFloja(param, column, loja, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}
module.exports.getChavesProdutos = function(app, req, res){

  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtosM(connection)

  produtosModel.getChavesProdutos((err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}
