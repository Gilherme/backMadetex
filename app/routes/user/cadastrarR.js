module.exports = function(app){

  app.post('/cadastrarUsuario', (req, res) => {
    app.app.controllers.user.cadastrarC.cadastrarUsuario(app, req, res);
  })

  app.post('/verificarUsuario', (req, res) => {
    app.app.controllers.user.cadastrarC.verificarUsuario(app, req, res);
  })

}
