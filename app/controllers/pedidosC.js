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

module.exports.getPedidoPorUsuario = function(app, req, res){
  const idUser = req.query.idUser

  const connection = app.config.dbConnection
  const pedidosModel = new app.app.models.pedidosM(connection)
  
  pedidosModel.getPedidoPorUsuario(idUser, (err, result) => {
    if(err){
      res.json({msg: "erro ao encontrar pedido", "erro": err})
    }else{
      res.json(result)
    }
  })
}
module.exports.getUltimosPedidos = function(app, req, res){
  const limit = parseInt(req.query.limit)

  const connection = app.config.dbConnection
  const pedidosModel = new app.app.models.pedidosM(connection)
  
  pedidosModel.getUltimosPedidos(limit, (err, result) => {
    if(err){
      res.json({msg: "erro ao encontrar pedidos", "erro": err})
    }else{
      res.json(result)
    }
  })
}
module.exports.getPedidosPorStatus = function(app, req, res){
  const limit = parseInt(req.query.limit);
  const status = req.query.staus;

  const connection = app.config.dbConnection
  const pedidosModel = new app.app.models.pedidosM(connection)
  
  pedidosModel.getPedidosPorStatus(status, limit, (err, result) => {
    if(err){
      res.json({msg: "erro ao encontrar pedidos", "erro": err})
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
  const id = req.headers.id;
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
  const produto = req.body

  const connection = app.config.dbConnection
  const pedidosModel = new app.app.models.pedidosM(connection)

  pedidosModel.criarPedidoProduto(produto, (err, result) => {
    if(err){
    res.json({"msg": "erro ao criar pedidoProduto", "error":  err})
    }else{
      res.json({msg: "pedidoProduto criado com sucesso"})
    }
  })
}

module.exports.getProdutosDoPedido = function(app, req, res){
  const idPedido = req.query.idPedido

  const connection = app.config.dbConnection
  const pedidosModel = new app.app.models.pedidosM(connection)

  pedidosModel.getProdutosDoPedido(idPedido, (err, result) => {
    if(err){
      res.json({msg: "erro em pegar os produtos do pedido", "erro": err})
    }else{
      res.json(result)
    }
  })
}

module.exports.getPrecoDoFrete = function(app, req, res){
  const cidade = req.query.cidade;
  const preco =  parseInt(req.query.preco);

  if(cidade === "Campo Limpo Paulista"){
    if(preco >= 300){
      res.json({precoFrete: "Grátis", diasParaEntrega: 4})
    }else{
      res.json({precoFrete: 49, diasParaEntrega: 4}) 
    }
  }
  if(cidade == "Jundiai"){
    if(preco >= 1900){
      res.json({precoFrete: "Grátis", diasParaEntrega: 6})
    }else{
      res.json({precoFrete: 149, diasParaEntrega: 6})
    }
  }
  if(cidade == "Varzea Paulista"){
    if(preco >= 300){
      res.json({precoFrete: "Grátis", diasParaEntrega: 6})
    }else{
      res.json({precoFrete: 49, diasParaEntrega: 5}) 
    }
  }
  if(cidade == "Jarinu"){
    if(preco >= 2900){
      res.json({precoFrete: "Grátis", diasParaEntrega: 8})
    }else{
      res.json({precoFrete: 149, diasParaEntrega: 6}) 
    }
  }
  if(cidade == "Itupeva"){
    if(preco >= 5000){
      res.json({precoFrete: "Grátis", diasParaEntrega: 8})
    }else{
      res.json({precoFrete: 249, diasParaEntrega: 8}) 
    }
  }
  if(cidade == "Louveira"){
    if(preco >= 5000){
      res.json({precoFrete: "Grátis", diasParaEntrega: 8})
    }else{
      res.json({precoFrete: 249, diasParaEntrega: 8}) 
    }
  }  
  if(cidade == "Atibaia"){
    if(preco >= 1900){
      res.json({precoFrete: "Grátis", diasParaEntrega: 6})
    }else{
      res.json({precoFrete: 149, diasParaEntrega: 6}) 
    }
  } 
  else{
    res.json({msg: 'Sinto muito, ainda não entregamos no seu endereço, Mas você ainda pode retirar na loja', cidade: cidade, preco: preco})
  }
}

// presencial

module.exports.criarPedidoPresencial =  function(app, req, res){
  const pedido = req.body

  const connection = app.config.dbConnection
  const pedidosModel = new app.app.models.pedidosM(connection)

  pedidosModel.criarPedidoPresencial(pedido, (err, result ) => {
    if(err){
      res.json({mgs: 'erro ao criar pedido' + err});
    }
    else{
      res.json({msg: 'pedido criado com sucesso'})
    }  
  })
}
module.exports.getPedidoPresencialPorId = function(app, req, res){
  const id = req.query.idUser

  const connection = app.config.dbConnection
  const pedidosModel = new app.app.models.pedidosM(connection)
  
  pedidosModel.getPedidoPresencialPorId(id, (err, result) => {
    if(err){
      res.json({msg: "erro ao encontrar pedido", "erro": err})
    }else{
      res.json(result)
    }
  })
}
module.exports.getPedidosPresencial = function(app, req, res){
  const limit = parseInt(req.query.limit)

  const connection = app.config.dbConnection
  const pedidosModel = new app.app.models.pedidosM(connection)
  
  pedidosModel.getPedidosPresencial(limit, (err, result) => {
    if(err){
      res.json({msg: "erro ao encontrar pedidos", "erro": err})
    }else{
      res.json(result)
    }
  })
}
module.exports.editarPedidoPresencial = function(app, req, res){
  const id = req.headers.id;
  const pedido = req.body;

  const connection = app.config.dbConnection
  const pedidosModel = new app.app.models.pedidosM(connection)
  
  pedidosModel.editarPedidoPresencial(id, pedido, (err, result) => {
    if(err){
      console.log(err)
      res.status(500).json({msg: "erro ao editar pedido", "erro": err })
    }
    else{
      res.json({msg: "pedido editado com sucesso"})
    }
  })
}  
