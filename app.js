var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const { connecter } = require('./db/connect')
const { router } = require('./routes/utilisateur')

const app = express()

// Configurations plus avancées avec cors
const corsOptions = {
  origin: 'http://localhost:3000', // Remplacez par l'URL de votre application React
  methods: 'GET,PUT,POST,DELETE',
  optionsSuccessStatus: 200 // certaines versions de navigateurs exigent un code de statut explicite
};

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use("/api/v1", router)

//connexion a la base de donnée
connecter("mongodb://127.0.0.1:27017/", (error) => {

  if (error) {

    console.log('Error lors de la connexion a la base de données')
    process.exit(-1)

  } else {

    console.log('connexion a la base de donnée reussi')
    app.listen(5050)

  }
  
})