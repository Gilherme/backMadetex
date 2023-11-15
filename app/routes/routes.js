const chaveSecreta = 'suaChaveSecreta';
const jwt = require('jwt-simple');

const autenticacaoMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ msg: 'Token não fornecido' });
  }

  try {
    const payload = jwt.verify(token, chaveSecreta);
    req.user = payload; // Adiciona o payload ao objeto de requisição para ser usado posteriormente
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
};

const autorizacaoMiddleware = (req, res, next) => {
  const user = req.user;

  // Verifica se o usuário é um administrador (adicione sua lógica de verificação aqui)
  if (!user || !user.isAdmin) {
    return res.status(403).json({ msg: 'Sem permissão para realizar esta ação' });
  }

  next();
};


  function autenticacao(req, res, next){
    const token = req.headers.authorization

    if(token === 'Bearer 1234'){
      next();
    }else{
      res.status(401).json({msg: "Acesso não autorizado"})
    }
  }  
module.exports = function(app){

  app.get('/teste', (req, res) => {
    res.json({msg: 'Amigo estou aqui'})
  })

  // Controle

  app.delete('/DELproduto/:id', autenticacao, (req, res, next) => {
    app.app.controllers.produtosC.apagarProduto(app, req, res, id)
  })
  app.post('/adicionarProduto', autenticacao, (req, res, next) => {
    app.app.controllers.produtosC.adicionarProduto(app, req, res);
  })
  app.put('/editarProduto/:id', autenticacao, (req, res, next) => {
    app.app.controllers.produtosC.editarProduto(app, req, res,)
  })

  app.get('/produto', (req, res, next) => {
    app.app.controllers.produtosC.getProduto(app, req, res, next)
  })
  app.get('/todosProdutos', (req, res, next) => {
    app.app.controllers.produtosC.getTodosProdutos(app, req, res, next)
  })
  app.get('/produtos', (req, res, next) => {
    app.app.controllers.produtosC.getProdutos(app, req, res, next)
  })
  app.get('/produtosPopulares', (req, res, next) => {
    app.app.controllers.produtosC.getProdutosPopulares(app, req, res, next)
  })
  app.get('/produtosEmOferta', (req, res, next) =>{
    app.app.controllers.produtosC.getProdutosEmOferta(app, req, res, next)
  })

  app.get('/todosPordutosPorLoja', (req, res) => {
    app.app.controllers.produtosC.getTodosProdutosPorLoja(app, req, res)
  })
  app.get('/produtosPorLoja', (req, res, next) => {
    app.app.controllers.produtosC.getProdutosPorLojaEcategoria(app, req, res, next)
  })
  app.get('/produtosPopularesPorLoja', (req, res, next) => {
    app.app.controllers.produtosC.getProdutosPopularesPorLoja(app, req, res, next)
  })
  app.get('/produtosEmOfertaPorLoja', (req, res, next) => {
    app.app.controllers.produtosC.getProdutosEmOfertaPorLoja(app, req, res, next)
  })
  app.get('/produtosFiltroLoja', (req, res, next) => {
    app.app.controllers.produtosC.getProdutosFloja(app, req, res, next)
  })

  app.get('/chavesProdutos', (req, res, next) => {
    app.app.controllers.produtosC.getChavesProdutos(app, req, res, next)
  })

  app.get('/homeLoja', (req, res) => {
    app.app.controllers.lojasC.getDasosLoja(app, req, res)
  })
  app.get('/todasAsLojas', (req, res) => {
    app.app.controllers.lojasC.getTodasAsLojas(app, req, res)
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
  app.get('/confirmarEmail', (req, res) => {
    app.app.controllers.userC.confirmarEmail(app, req, res);
  })
  app.get('/recuperacaoDeConta', (req, res) => {
    app.app.controllers.userC.recuperacaoDeConta(app, req, res);
  })
  app.put('/alterarSenha', (req, res) => {
    app.app.controllers.userC.alterarSenha(app, req, res);
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

  app.get('/TodasAsChaves', (req, res, next) => {
    app.app.controllers.configC.todasAsChaves(app, req, res, next);
  })

}

