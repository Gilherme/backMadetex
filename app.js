var app = require('./config/server')
const port = 1039;

let conn = app.config.dbConnection 
conn.query(`INSERT INTO sua_tabela
 (chave, param, local) 
 VALUES ('sua_chave', 'param teste 1', 'seu_local);"`,
  (err, result) =>{
  if(err){
    console.log("deu ruim " + err)
  }else{
    console.log('adicionado com sucesso')
  }
})

app.listen(port, () => {
  console.log(`servidor on na porta http://localhost:${port}`)
})