module.exports.cadastrarUsuario  = function(app, req, res){
  let usuario = req.body

  let connection = app.config.dbConnection
  let cadastroModel = new app.app.models.user.cadastrarM(connection)

  cadastroModel.cadastrarUser(usuario, function(err, result) {
    if(err){
        res.json({mgs: 'Erro ao cadastrar usuario' + err});
    }
    else{
      res.json({msg: 'Usuario cadastrado com sucesso'})
    }   
  })
}

module.exports.verificarUsuario = function(app, req, res){
  const email = req.body.email;

  let connection = app.config.dbConnection
  let cadastroModel = new app.app.models.user.cadastrarM(connection)

  cadastroModel.verificarUser(email, function(err, result){
 
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    const count = result[0].count;
    if (count > 0) {
      return res.json({ existe: true });
    } else {
      return res.json({ existe: false });
    }
  });
}