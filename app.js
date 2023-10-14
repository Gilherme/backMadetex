var app = require('./config/server')
const port = 1039;


app.listen(port, () => {
  console.log(`servidor on na porta http://localhost:${port}`)
})