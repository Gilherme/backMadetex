module.exports = function(app){

  function autenticacao(req, res, next){
    const token = req.headers.authorization

    if(token === 'Bearer 1234'){
      next();
    }else{
      res.status(401).send('Acesso não autorizado');
    }
  }
  app.delete('/DELproduto/:id', autenticacao, (req, res) => {
    const id = req.params.id;
    app.app.controllers.produtos.delProdutosC.delProduto(app, req, res, id)
  })
  app.delete('/DELmadeiramento/:id', autenticacao, (req, res) => {
    const id = req.params.id;
    app.app.controllers.produtos.delProdutosC.delMadeiramento(app, req, res, id)
  })


}
