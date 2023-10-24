module.exports = function(app){
  const authMiddleware = app.config.passport.authenticate()
  function autenticacao(req, res, next){
    const token = req.headers.authorization

    if(token === 'Bearer 1234'){
      next();
    }else{
      res.status(401).json({msg: "Acesso não autorizado"})
    }
  }  

  app.get('/teste', (req, res) => {
    res.json({msg: 'Amigo estou aqui'})
  })

  app.delete('/DELproduto/:id', authMiddleware, (req, res) => {
    const id = req.params.id;
    app.app.controllers.produtosC.delProduto(app, req, res, id)
  })
  app.post('/adicionarProduto', authMiddleware, (req, res) => {
    app.app.controllers.produtoC.adicionarProduto(app, req, res);
  })
  app.put('/editarProduto/:id', autenticacao, (req, res) => {
    app.app.controllers.produtoC.editarProduto(app, req, res,)
  })

  app.get('/todosProdutos', (req, res, next) => {
    app.app.controllers.produtosC.getTodosProdutos(app, req, res, next)
  })
  app.get('/produtos', (req, res, next) => {
    app.app.controllers.produtosC.getProdutos(app, req, res, next)
  })
  app.get('/produtosPorLoja', (req, res, next) => {
    app.app.controllers.produtosC.getProdutosPorLoja(app, req, res, next)
  })
  app.get('/produto', (req, res, next) => {
    app.app.controllers.produtosC.getProduto(app, req, res, next)
  })
  app.get('/produtosPopulares', (req, res, next) => {
    app.app.controllers.produtosC.getProdutosPopulares(app, req, res, next)
  })
  app.get('/produtosEmOferta', (req, res, next) =>{
    app.app.controllers.produtosC.getProdutosEmOferta(app, req, res, next)
  })
  app.get('/produtosFloja', (req, res, next) => {
    app.app.controllers.produtosC.getProdutosFloja(app, req, res, next)
  })
  app.get('/chavesProdutos', (req, res, next) => {
    app.app.controllers.produtosC.getChavesProdutos(app, req, res, next)
  })

  app.get('/homeLoja', (req, res) => {
    app.app.controllers.lojasC.getDasosLoja(app, req, res)
  })

  
  app.post('/adicionarAoCarrinho', (req, res) => {
    app.app.controllers.userC.adicionarAoCarrinho(app, req, res);
  })
  app.delete('/apagarItemNoCarrinho/:id', (req, res) =>{
    app.app.controllers.userC.ApagarItemNoCar(app, req, res);
  })
  app.put('/editarItemNoCarrinho/:id', (req, res) =>{
    app.app.controllers.userC.editarItemNoCar(app, req, res);
  })
  app.get('/qtdDeProdutosNoCarrinho', (req, res) => {
    app.app.controllers.userC.qtdProdutosNoCarrinho(app, req, res);
  })
  app.get('/produtosNoCarrinho', (req, res) =>{
    app.app.controllers.userC.produtosNoCarrinho(app, req, res);
  })
  app.get('/produtosNoCarComFrete', (req, res) => {
    app.app.controllers.userC.getProdutosNoCarComFrete(app, req, res);
  })

  app.post('/enviarMensagem', (req, res) => {
    app.app.controllers.contatoC.enviarMensagem(app, req, res);
  })
  app.get('/getMensagem', (req, res) => {
    app.app.controllers.contatoC.getMensagem(app, req, res);
  })

  app.post('/login', (req, res) => {
    app.app.controllers.userC.logar(app, req, res);
  })
  app.get('/userPorId', (req, res) => {
    app.app.controllers.userC.getUserPorId(app, req, res);
  })
  app.put('/editarUsuario', (req, res) => {
    app.app.controllers.userC.editarUsuario(app, req, res);
  })
  app.post('/cadastrarUsuario', (req, res) => {
    app.app.controllers.userC.cadastrarUsuario(app, req, res);
  })

  app.post('/adicionarEndereco', (req, res) => {
    app.app.controllers.userC.adicionarEndereco(app, req, res);
  })
  app.get('/enderecosUser', (req, res) => {
    app.app.controllers.userC.getEnderecosPorId(app, req, res);
  })
  app.get('/enderecosUserPelosIds', (req, res) => {
    app.app.controllers.userC.getEnderecosPorIds(app, req, res);
  })
  app.put('/editarEndereco/:id', (req, res) => {
    app.app.controllers.userC.editarEndereco(app, req, res);
  })
  app.delete('/apagarEndereco/:id/:idUser', (req, res) =>{
    app.app.controllers.userC.apagarEndereco(app, req, res);
  })

}

