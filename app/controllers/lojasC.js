module.exports.getDasosLoja = function(app, req, res){
  const loja = req.query.loja

  let connection = app.config.dbConnection
  let homeModel = new app.app.models.lojasM(connection)

  homeModel.getDadosLojaM(loja, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}