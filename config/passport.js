const  chaveSecreta = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt;



module.exports = function(app) {
  const params = {
    secretOrKey: chaveSecreta, 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }  
   const strategy = new Strategy(params, (payload, done) => {

    const id = payload.id;
    const connection = app.config.dbConnection
    const cadastroModel = new app.app.models.user.cadastrarM(connection)

    cadastroModel.usuarioPorId(id, (error, result) => {
      if (error) {
        done(error, false);
      }else {
        done(null, result ? { ...payload } : false);
      }
    });
   })
   passport.use(strategy);
   return {
    authenticate: () => passport.authenticate('jwt', {session: false})
   }
}

