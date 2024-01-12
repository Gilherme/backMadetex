module.exports.criarPedido =  function(app, req, res){
  const pedido = req.body

  const connection = app.config.dbConnection
  const pedidosModel = new app.app.models.pedidosM(connection)

  pedidosModel.criarPedido(pedido, (err, result ) => {
    if(err){
      res.json({mgs: 'erro ao criar pedido' + err});
    }
    else{
      res.json({msg: 'pedido criado com sucesso'})
    }  
  })
}

module.exports.getPedido = function(app, req, res){
  const idUser = req.query.idUser

  const connection = app.config.dbConnection
  const pedidosModel = new app.app.models.pedidosM(connection)
  
  pedidosModel.getPedido(idUser, (err, result) => {
    if(err){
      res.json({msg: "erro ao encontrar pedido", "erro": err})
    }else{
      res.json(result)
    }
  })
}

module.exports.getPedidosMaisRecentes = function(app, req, res){
  const idUser = req.query.idUser
  const limit = parseInt(req.query.limit)

  const connection = app.config.dbConnection
  const pedidosModel = new app.app.models.pedidosM(connection)
  
  pedidosModel.getPedidosMaisRecentes(idUser, limit, (err, result) => {
    if(err){
      res.json({msg: "erro ao encontrar pedidos", "erro": err})
    }else{
      res.json(result)
    }
  })
}

module.exports.editarPedido = function(app, req, res){
  const id = req.params.id;
  const pedido = req.body;

  const connection = app.config.dbConnection
  const pedidosModel = new app.app.models.pedidosM(connection)
  
  pedidosModel.editarPedido(id, pedido, (err, result) => {
    if(err){
      console.log(err)
      res.status(500).json({msg: "erro ao editar pedido", "erro": err })
    }
    else{
      res.json({msg: "pedido editado com sucesso"})
    }
  })
}

module.exports.criarPedidoProduto = function(app, req, res){
  const produto = req.body;

  const connection = app.config.dbConnection
  const pedidosModel = new app.app.models.pedidosM(connection)

  pedidosModel.criarPedidoProduto(produto, (err, result) => {
    if(err){
      res.json({msg: "erro ao criar pedidoProduto" + err})
    }else{
      res.json('pedidoProduto criado com sucesso')
    }
  })
}
