var app = require('./config/server.js')
const port = 1039;


app.listen(port, () => {
  console.log(`servidor on na ${port}`)
})