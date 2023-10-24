
module.exports.enviarMensagem  = function(app, req, res){
  const mensagem = req.body
  console.log(mensagem)

  let connection = app.config.dbConnection
  let cadastroModel = new app.app.models.contatoM(connection)

  cadastroModel.enviarMensagem(mensagem, function(err, result) {
    if(err){
      console.log(err)
        res.json({mgs: 'Erro ao enviar mensagem' + err});
    }
    else{
      res.json({msg: 'Mensagem enviada com sucesso, em até 1 dia útil você receberá a resposta em seu E-mail'})
    }   
  })
}
module.exports.getMensagem = function(app, req, res){

  let connection = app.config.dbConnection
  let cadastroModel = new app.app.models.contatoM(connection)

  cadastroModel.getMensagem((err, result) => {

    if(err) throw err;
    res.json(result)
  })
}
