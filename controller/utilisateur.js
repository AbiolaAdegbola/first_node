const client = require('../db/connect')
const { Utilisateur } = require('../models/utilisateur')


const ajouterUtilisateur = async (req, res) => {
    try {
        let utilisateur = new Utilisateur(req.body.nom, req.body.email, req.body.mdp);

        let result = await client
        .db()
        .collection("utilisateurs")
        .insertOne(utilisateur);

        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(501).json(error)
    }
}

module.exports = { ajouterUtilisateur }