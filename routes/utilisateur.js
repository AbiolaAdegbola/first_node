const express = require('express')
const { ajouterUtilisateur,
     liste_utilisater,
     afficherUtilisateur, 
     modifierUtilisateur, 
     deleteUtilisateur } = require('../controller/utilisateur')

let router = express.Router()

router.route("/utilisateurs").post(ajouterUtilisateur)
router.route("/utilisateurs").get(liste_utilisater)
router.route("/utilisateurs/:id").get(afficherUtilisateur)
router.route("/utilisateurs/:id").put(modifierUtilisateur)
router.route("/utilisateurs/:id").delete(deleteUtilisateur)

module.exports = { router };

