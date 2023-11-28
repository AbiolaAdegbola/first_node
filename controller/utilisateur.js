const { ObjectID } = require('mongodb');
const client = require('../db/connect')
const { Utilisateur } = require('../models/utilisateur');


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

const liste_utilisater = async (req, res) => {
    try {

        let cursor = client.db().collection("utilisateurs").find()

        let result = await cursor.toArray()

        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(204).json({ msg: "Aucun utilisateur trouvé" })
        }

    } catch (error) {

        console.error(error)
        res.status(500).json(result)

    }
}

const afficherUtilisateur = async (req, res) => {

    try {

        let id = new ObjectID(req.params.id)

        let cursor = client.db().collection("utilisateurs").find({ _id: id })

        let result = await cursor.toArray()

        if (result.length > 0) {

            res.status(200).json(result[0])

        } else {

            res.status(204).json({ msg: "cet utilisateur n'existe pas" })

        }

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const modifierUtilisateur = async (req, res) => {
    try {

        const id = ObjectID(req.params.id)

        const nom = req.body.nom
        const email = req.body.email
        const mdp = req.body.mdp

        let result = await client.db().collection("utilisateurs").updateOne({ _id: id }, { $set: { nom, email, mdp } })

        if (result.modifiedCount === 1) {

            res.status(200).json({ msg: "Modification effectuée avec succès" })

        } else {

            res.status(200).json({ msg: "Aucune donnée n'a été modifié" })

        }

    } catch (error) {

        console.error(error)
        res.status(500).json(error)

    }
}

const deleteUtilisateur = async (req, res) => {

    try {

        let id = new ObjectID(req.params.id)

        let result = await client.db().collection("utilisateurs").deleteOne({ _id: id })

        if (result.deletedCount === 1) {

            res.status(200).json({ msg: 'utilisateur supprimé avec succès' })

        } else {

            res.status(404).json({ msg: "cet utilisateur n'est existe pas" })

        }

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = { ajouterUtilisateur, 
    liste_utilisater, 
    afficherUtilisateur, 
    modifierUtilisateur, 
    deleteUtilisateur }