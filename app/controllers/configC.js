
module.exports.todasAsChaves = function(app, req, res){

  let connection = app.config.dbConnection
  let configModel = new app.app.models.configM(connection)

  configModel.todasAsChaves((err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}
module.exports.chavesPesquisa = function(app, req, res, next){

  let connection = app.config.dbConnection
  let configModel = new app.app.models.configM(connection)

  configModel.chavesPesquisa((err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}