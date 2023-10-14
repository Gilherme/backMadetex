module.exports = function(app){

  app.get('/produtos', (req, res, next) => {
    app.app.controllers.produtos.getProdutosC.getProdutos(app, req, res, next)
  })
  app.get('/produto', (req, res, next) => {
    app.app.controllers.produtos.getProdutosC.getProduto(app, req, res, next)
  })

  app.get('/madeiramentos', (req, res, next) => {
    app.app.controllers.produtos.getProdutosC.getMadeiramentos(app, req, res, next)
  })
  app.get('/madeiramento', (req, res, next) => {
    app.app.controllers.produtos.getProdutosC.getMadeiramento(app, req, res, next)
  })
  
}