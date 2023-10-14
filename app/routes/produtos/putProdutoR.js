module.exports = function(app){

  function autenticacao(req, res, next){
    const token = req.headers.authorization

    if(token === 'Bearer 1234'){
      next();
    }else{
      res.status(401).send('Acesso não autorizado');
    }
  }

  app.put('/editarproduto/:id', autenticacao, (req, res) => {
    app.app.controllers.produtos.putProdutoC.editarProduto(app, req, res,)
  })
  
  app.put('/editarmadeiramento/:id', autenticacao, (req, res) => {
    const id = req.params.id;
    app.app.controllers.produtos.putProdutoC.editarMadeiramento(app, req, res, id)
  })

}

