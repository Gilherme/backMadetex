module.exports = function(app){

  app.post('/adicionarProduto', (req, res) => {
    app.app.controllers.produtos.addProdutoC.adicionarProduto(app, req, res);
  })
  app.post('/adicionarMadeiramento', (req, res) => {
    app.app.controllers.produtos.addProdutoC.adicionarMadeiramento(app, req, res);
  })
}