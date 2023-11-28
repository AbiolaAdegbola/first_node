const express = require('express')
const { ajouterUtilisateur } = require('../controller/utilisateur')

let router = express.Router()

router.route("/utilisateurs").post(ajouterUtilisateur)

module.exports =  {router};

