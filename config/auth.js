const authSecret = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

module.exports.validaToken = function(app, req, res){
  const userData = req.body || null

  try{
    if(userData) {
      const token = jwt.decode(userData.token, authSecret)
      if(new Date(token.exp * 1000) > new Date()){
        return res.send(true)
      }
    }
  }catch(e){
    // problema com token
  }
  res.send(false)
}