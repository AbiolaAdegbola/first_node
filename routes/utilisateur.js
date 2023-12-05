const express = require('express')
const { ajouterUtilisateur,
     liste_utilisateur,
     afficherUtilisateur, 
     modifierUtilisateur, 
     deleteUtilisateur } = require('../controller/utilisateur')

let router = express.Router()

router.route("/utilisateurs").post(ajouterUtilisateur)
router.route("/utilisateurs").get(liste_utilisateur)
router.route("/utilisateurs/:id").get(afficherUtilisateur)
router.route("/utilisateurs/").put(modifierUtilisateur)
router.route("/utilisateurs/").delete(deleteUtilisateur)
// router.route("/connexion/").post(connexion_page)

module.exports = { router };

