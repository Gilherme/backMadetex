module.exports = middleware => {
  return (req, res, next) => {
    console.log('Middleware Admin está sendo chamado');
    if (req.user.admin) {
      middleware(req, res, next)
      res.json('entrou aqui')
      console.log('Usuário é um administrador');
    } else {
      res.status(401).json({ msg: "Usuário não é administrador" })
      console.log('usuário não é um administrador')
    }
  }
}