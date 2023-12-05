const { ObjectID } = require('mongodb');
const client = require('../db/connect')
const { Utilisateur } = require('../models/utilisateur');

const connexion_page = async (req, res) =>{
    try {

        email = req.body.email,
        mdp = req.body.mdp

        let cursor = client.db().collection('utilisateurs').find({email: email, mdp: mdp})

        let result = await cursor.toArray()

        if (result.length>0) {

            res.status(200).json({msg: "connexion effectuée avec succès"})

            
        } else {
            
            res.status(204).json({msg: "L'utilisateur n'existe pas "})

        }
        
    } catch (error) {
        
        console.error(error)
        res.status(500).json({result})

    }
}

const ajouterUtilisateur = async (req, res) => {

    try {

        const nom = req.body.nom
        const email = req.body.email
        const telephone = req.body.telephone
        const message = req.body.message

        let utilisateur = new Utilisateur(nom, email, telephone, message);

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

const liste_utilisateur = async (req, res) => {

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

        const id = ObjectID(req.body.id)

        const nom = req.body.nom
        const email = req.body.email
        const telephone = req.body.telephone
        const message = req.body.message

        let result = await client.db().collection("utilisateurs").updateOne({ _id: id }, { $set: { nom, email, telephone, message } })

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

        let id = new ObjectID(req.body.id)

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
    liste_utilisateur, 
    afficherUtilisateur, 
    modifierUtilisateur, 
    deleteUtilisateur,
    connexion_page }