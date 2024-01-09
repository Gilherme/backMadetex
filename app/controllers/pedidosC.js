module.exports.criarPedido = function(app, req, res){
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
  const id = req.query.id

  const connection = app.config.dbConnection
  const pedidosModel = new app.app.models.pedidosM(connection)
  
  pedidosModel.getPedido(idUser, id, (err, result) => {
    if(err){
      console.log(err)
      res.json({msg: "erro ao encontrar pedido", "erro": err})
    } 
      res.json(result)
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