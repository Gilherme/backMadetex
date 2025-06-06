const chaveSecreta = require('../../.env');
const jwt = require('jwt-simple');
const AWS = require('aws-sdk');
const bcrypt = require('bcrypt')
const crypto = require('crypto');
// guibarreto12@gmail.com 123456

AWS.config.update({ region: 'us-east-1' });


function enviarEmailDeVerificacao(email, token){
  const link = `https://api.madetex.com.br/confirmarEmail?token=${token}&email=${email}`
  const ses = new AWS.SES();

  const params = {
    Destination: {
      ToAddresses: [`${email}`],
    },
    Message: {
      Body: {
        Text: {
          Data: `Ficamos felizes ter você como cliente!!
          click no link abaixo para verificar seu email 
          ${link}` ,
        },
      },
      Subject: {
        Data: 'Madetex - verificação de email',
      },
    },
    Source: 'madetex@madetex.com.br',
  };
  
  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('E-mail enviado com sucesso:', data);
    }
  });
}

function enviarEmailDeNotificacao(email){
  const link = `https://www.madetex.com.br/src/views/user/alterarSenhaTwo.html/?token=${token}&email=${email}`
  const ses = new AWS.SES();

  const params = {
    Destination: {
      ToAddresses: [`guibarreto64042@gmail.com`],
    },
    Message: {
      Body: {
        Text: {
          Data: `Usuario novo!! 

           ${email}`,
        },
      },
      Subject: {
        Data: 'Madetex - Recuperar conta',
      },
    },
    Source: 'madetex@madetex.com.br',
  };

  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.error(err.message);
    } else {
    }
  });
}

function enviarEmailDerecuperacao(email, token){
  const link = `https://www.madetex.com.br/src/views/user/alterarSenhaTwo.html/?token=${token}&email=${email}`
  const ses = new AWS.SES();

  const params = {
    Destination: {
      ToAddresses: [`${email}`],
    },
    Message: {
      Body: {
        Text: {
          Data: `Clique no link abaixo para recuperar sua conta.
          link: ${link}`,
        },
      },
      Subject: {
        Data: 'Madetex - Recuperar conta',
      },
    },
    Source: 'madetex@madetex.com.br',
  };
  
  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('E-mail enviado com sucesso:', data);
    }
  });
}

function generateToken() {
  return crypto.randomBytes(20).toString('hex'); // Gera um token aleatório
}

const encrypitarSenha = senha => {
  const sal = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(senha, sal)
}

function existeOuNao(valor, msg, idEl) {
  const resposta = {}; resposta.msg = msg; resposta.el = idEl || 0
  if (!valor || (typeof valor === 'string' && !valor.trim())) {
    throw resposta;
  }
}

module.exports.cadastrarUsuario  = function(app, req, res){
  const usuario = req.body;

  const connection = app.config.dbConnection
  const cadastroModel = new app.app.models.userM(connection)

  try{
    existeOuNao(usuario.nome, 'Nome não informado', '#nome');
    existeOuNao(usuario.email, 'Email não informado', "#email");
    existeOuNao(usuario.telefone, 'Telefone celular não informado', "#telefone");
    existeOuNao(usuario.senha, 'Senha não informada', "#senha");
  }catch(msg){
    return res.status(400).json(msg)
  }

  usuario.senha = encrypitarSenha(usuario.senha)
  usuario.token = generateToken();

  cadastroModel.verificarUser(usuario.email, function(err, result){
    if(err){
      console.log('Erro ao verificar usuário: ' + err);
      return res.status(500).json({ msg: 'Erro interno' });
    }

    const count = result[0].count;
   
    if (count > 0){
      res.status(400).json({ msg: 'Email já cadastrado', email: "email"});
    }
    else{
      usuario.admin = 0
      cadastroModel.cadastrarUser(usuario, function(err, result) {
          if(err){
              console.log(err)
              res.json({mgs: 'Erro ao cadastrar usuario' + err});
          }
          else{
            res.status(200).json({msg: 'Usuario cadastrado com sucesso'})
            enviarEmailDeVerificacao(usuario.email, usuario.token)
            enviarEmailDeNotificacao(usuario.email)
          }   
      })
     
    }
  }) 
}
module.exports.confirmarEmail = function(app, req, res){
  const email = req.query.email;
  const token = req.query.token;

  let connection = app.config.dbConnection;
  let userModel = new app.app.models.userM(connection)

  userModel.userPorEmail(email, function(err, result){
    if(err){
      console.log(err);
    } 
    else{
      if(email == result[0].email && token == result[0].token){
        res.write("Email confirmado com sucesso!")
        res.end();
      }
    }
  })
}
module.exports.recuperacaoDeConta = function(app, req, res){
  const email = req.query.email;

  let connection = app.config.dbConnection;
  let userModel = new app.app.models.userM(connection)

  userModel.userPorEmail(email, function(err, result){
    if(err || !result || result.length === 0){
        res.status(404).json({msg: "Email não encontrado"});
    } 
    else{
        const token = result[0].token;
        enviarEmailDerecuperacao(email, token);
        res.status(200).json({msg: 'Email enviado com sucesso!'});
    }
  });
}
module.exports.alterarSenha = function(app, req, res){
  const user = req.body

  const connection = app.config.dbConnection
  const cadastroModel = new app.app.models.userM(connection)

  cadastroModel.userPorEmail(user.email, function(err, result){

    if(err || !result || result.length === 0){
      console.log('Erro ao verificar usuário: ' + err);
      return res.status(500).json({ msg: 'Erro interno' });
    }
    else if(user.token === result[0].token){
      user.senha = encrypitarSenha(user.senha)
      
      cadastroModel.alterarSenha(user.senha, user.email, function(err, result){
        if(err){
          return res.status(500).json({ msg: 'Erro ao alterar senha no banco de dados' });
        }
        else{
          return res.status(200).json({msg: 'senha alterada com sucesso'})
        }
      })
    }
    res.end()
  })
}
module.exports.logar = async function(app, req, res){
  if(!req.body.email || !req.body.senha){
    return res.status(400).json({ msg: 'Informe email e senha'})
  }

  const connection = app.config.dbConnection
  const cadastroModel = new app.app.models.userM(connection)

  cadastroModel.verificarUsuario(req.body.email , function(err, result){
    if(err){
      console.log('Erro ao verificar usuário: ' + err);
      return res.status(500).json({ msg: 'Erro interno' });
    }
    if(result.length === 0){
      res.status(400).json({ msg: 'Email não cadastrado' });
    }
    else{
      const deuMath = bcrypt.compareSync(req.body.senha, result[0].senha)
      if(!deuMath){
        return res.status(401).json({msg: 'senha inválida'})
      }
      
      const agr = Math.floor(Date.now() / 1000)
      
      const payload = {
        id: result[0].id,
        nome: result[0].nome,
        email: result[0].email,
        admin: result[0].admin,
        iat: agr,
        exp: agr + (60 * 60 * 24 * 365 * 50)
      }

      res.json({
        ...payload,
        token: jwt.encode(payload,  chaveSecreta)
      })
    }
  })
}
module.exports.dadosDoUsuario = function(app, req, res){
  const id = req.headers.id

  let connection = app.config.dbConnection
  let userModel = new app.app.models.userM(connection)

  userModel.usuarioPorId(id, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}
module.exports.editarUsuario = function(app, req, res){
  const user = req.body

  const connection = app.config.dbConnection
  const cadastroModel = new app.app.models.userM(connection)

  cadastroModel.usuarioPorId(user.id , function(err, result){
    if(err){
      console.log('Erro ao verificar usuário: ' + err);
      return res.status(500).json({ msg: 'Erro interno' });
    }
    if (result.length === 0){
      res.status(400).json({ msg: 'Usuario sem cadastro' });
    }
    else{
      const deuMath = bcrypt.compareSync(req.body.senha, result[0].senha)
      if(!deuMath){
        return res.status(401).json({msg: 'Senha Inválida'})
      }
      delete user.senha;
      cadastroModel.atualizarUsuario(user, user.id, function(err, result){
        if(err){
          console.log('Erro ao atualizar usuario: ' + err);
          return res.status(500).json({ msg: 'Erro interno' });
        }
        else{
          res.status(200).json({msg: 'Dados atualizados com sucesso'})
        }
      })
    }
  })
}

module.exports.adicionarAoCarrinho  = function(app, req, res){ 
  let produto = req.body

  let connection = app.config.dbConnection
  let carrinhoModel = new app.app.models.userM(connection)

  carrinhoModel.addAoCarrinho(produto, function(err, result) {
    if(err){
        console.log(err)
        res.json({mgs: 'erro ao adicionar ao carrinho' + err});
    }
    else{
      res.json({msg: 'Produto adicionado ao carrinho com sucesso'})
    }   
  })
}
module.exports.qtdProdutosNoCarrinho = function(app, req, res){
  let idUsuario = req.query.id

  let connection = app.config.dbConnection
  let carrinhoModel = new app.app.models.userM(connection)

  carrinhoModel.qtdProdutosNoCarrinho(idUsuario, function(err, result) {
    if(err) throw err;
    res.json(result)
  })
}
module.exports.produtosNoCarrinho = function(app, req, res){
  const idUsuario = req.query.id

  let connection = app.config.dbConnection
  let carrinhoModel = new app.app.models.userM(connection)

  carrinhoModel.produtosNoCarrinho(idUsuario, function(err, result){
    if(err)throw err;
    res.json(result)
  })
}
module.exports.editarItemNoCar = function(app, req, res){
  const produtoAtualizado = req.body
  const idProduto = req.params.id

  let connection = app.config.dbConnection
  let carrinhoModel = new app.app.models.userM(connection)

  carrinhoModel.editarItemNoCarrinho(produtoAtualizado, idProduto, function(err, result){
    if(err) throw err
    res.json({msg: "produto editado com sucesso"})
  })
}
module.exports.getProdutosNoCarComFrete = function(app, req, res){
  const idUsuario = req.query.id
  const cidade = req.query.cidade

  let connection = app.config.dbConnection
  let carrinhoModel = new app.app.models.userM(connection)

  carrinhoModel.produtosNoCarrinho(idUsuario, function(err, result){
    if(err)throw err;
    
    const produtos = result
    
    for (let i = 0; i < produtos.length; i++) {
      produtos[i].freteGratis = precoFrete(produtos[i].loja, cidade);
    }

    res.json(produtos)
  })
}
module.exports.ApagarItemNoCar = function(app, req, res){
  const id = req.params.id
  
  let connection = app.config.dbConnection
  let carrinhoModel = new app.app.models.userM(connection)

  carrinhoModel.apagarItemNoCarrinho(id, function(err, result){
    if(err) throw err
    res.json({msg: "produto removido do carrinho com sucesso"})
  })
}
module.exports.esvaziarCarrinho = function(app, req, res){
  const idUser = req.params.id
  
  let connection = app.config.dbConnection
  let carrinhoModel = new app.app.models.userM(connection)

  carrinhoModel.esvaziarCarrinho(idUser, function(err, result){
    if(err) throw err
    res.json({msg: "carrinho esvaziado"})
  })
}

module.exports.adicionarEndereco = function(app, req, res){
  const endereco = req.body

  let connection = app.config.dbConnection
  let carrinhoModel = new app.app.models.userM(connection)

  try{
    existeOuNao(endereco.nome, 'Nome não informado', '#nome');
    existeOuNao(endereco.cep, 'CEP não informado', "#cep");
    existeOuNao(endereco.estado, 'Estado não informado', "#estado")
    existeOuNao(endereco.cidade, 'Cidade não informada', "#cidade")
    existeOuNao(endereco.rua, 'Rua não informada', "#rua")
    existeOuNao(endereco.numero, 'Numero não informado', "#numero")
    existeOuNao(endereco.telefone, 'Telefone não informado', "#telefone");
    existeOuNao(endereco.bairro, 'Senha não informada', "#bairro");
  }catch(msg){
    return res.status(400).json(msg)
  }

  carrinhoModel.cadastrarEndereco(endereco, function(err, result) {
    if(err) throw err;
    res.json({msg: "Endereço cadastrado com sucesso"})
  })
}
module.exports.getEnderecosPorId = function(app, req, res){
  const id = req.query.id

  let connection = app.config.dbConnection
  let userModel = new app.app.models.userM(connection)

  userModel.enderecoPorId(id, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}
module.exports.getEnderecosPorIds = function(app, req, res){
  const idUser = req.query.idUser
  const idEnde = req.query.idEnde

  let connection = app.config.dbConnection
  let userModel = new app.app.models.userM(connection)

  userModel.enderecoPorIds(idEnde, idUser, (err, result) =>{
    if(err) throw err;
    res.json(result)
  }); 
}
module.exports.editarEndereco = function(app, req, res){
  const endereco = req.body
  const id = req.params.id

  let connection = app.config.dbConnection
  let carrinhoModel = new app.app.models.userM(connection)

  try{
    existeOuNao(endereco.nome, 'Nome não informado', '#nome');
    existeOuNao(endereco.cep, 'CEP não informado', "#cep");
    existeOuNao(endereco.estado, 'Estado não informado', "#estado")
    existeOuNao(endereco.cidade, 'Cidade não informada', "#cidade")
    existeOuNao(endereco.rua, 'Rua não informada', "#rua")
    existeOuNao(endereco.numero, 'Numero não informado', "#numero")
    existeOuNao(endereco.telefone, 'Telefone não informado', "#telefone");
    existeOuNao(endereco.bairro, 'Senha não informada', "#bairro");
  }catch(msg){
    return res.status(400).json(msg)
  }

  carrinhoModel.editarEndereco(endereco, id, function(err, result){
    if(err) throw err
    res.json({msg: "Endereco editado com sucesso"})
  })
}
module.exports.apagarEndereco = function(app, req, res){
  const id = req.params.id
  const idUser = req.params.idUser
  
  let connection = app.config.dbConnection
  let carrinhoModel = new app.app.models.userM(connection)

  carrinhoModel.apagarEndereco(id, idUser, function(err, result){
    if(err) throw err
    res.json({msg: "Endereço excluido com sucesso"})
  })
}
