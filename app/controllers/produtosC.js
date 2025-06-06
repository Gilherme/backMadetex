
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
module.exports.apagarProduto = function(app, req, res){
  const id = req.params.id;

  let connection = app.config.dbConnection
  let controleModel = new app.app.models.produtosM(connection)

  controleModel.apagarProduto(id, (err, result) => {
    if (err) {
      console.error('Erro ao apagar produto:', err);
      res.status(500).json({ error: 'Erro ao apagar produto.' });
    } else {
      res.status(200).json({ msg: "produto apagado"});
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
module.exports.getProdutosExibicao = function(app, req, res){
  const param = req.query.param
  const column = req.query.column
  const limit = parseInt(req.query.limit)
 
  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtosM(connection)

  produtosModel.getProdutosExibicao(param, column, limit, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
};
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

module.exports.getProdutosPorLojaEcategoria = function(app, req, res, next){
  const loja = req.query.loja
  const categoria = req.query.categoria
  const limit = parseInt(req.query.limit)

  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtosM(connection)

  produtosModel.getProdutosPorLojaEcategoria(loja, categoria, limit, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}
module.exports.getTodosProdutosPorLoja = function(app, req, res, next){
  const loja = req.query.loja

  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtosM(connection)

  produtosModel.getTodosProdutosPorLoja(loja, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}
module.exports.getProdutosPopularesPorLoja = function(app, req, res){
  const loja = req.query.loja
  const limit = parseInt(req.query.limit)

  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtosM(connection)

  produtosModel.getProdutosPopularesPorLoja(loja, limit, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}
module.exports.getProdutosEmOfertaPorLoja = function(app, req, res){
  const loja = req.query.loja
  const limit = parseInt(req.query.limit)

  let connection = app.config.dbConnection
  let produtosModel = new app.app.models.produtosM(connection)

  produtosModel.getProdutosEmOfertaPorLoja(loja, limit, (err, result) =>{
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
