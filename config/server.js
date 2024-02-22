const express =  require('express')
const consign = require('consign')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
  
consign()
  .include('app/routes')
  .then('config/dbConnection.js')
  .then('app/models')
  .then('app/controllers')
  .into(app);

module.exports = app;
