var express = require('express')
var bodyParser = require('body-parser')
const { connecter } = require('./db/connect')
const  router  = require('./routes/utilisateur')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

app.use("/api/v1", router)

//connexion a la base de donnée
connecter("mongodb://127.0.0.1:27017/", (error) => {
  if (error) {

    console.log('error lors de la connexion a la base de données')
    process.exit(-1)

  }else{

    console.log('connexion a la base de donnée reussi')
    app.listen(5050)

  }
})