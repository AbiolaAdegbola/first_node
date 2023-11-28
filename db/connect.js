const { MongoClient, Db } = require('mongodb')

var client = null

function connecter(url, callback) {
    if (client === null) {
        client = new MongoClient(url)

        client.connect((erreur) => {
            if (erreur) {
                client = null
                callback(erreur)
            } else {
                callback()
            }
        })
    } else {
        callback()
    }
}

function db() {
    let db = new Db(client, "utilisateurs")
    return db
}

function fermerConnexion() {
    if (client) {
        client.close()
        client = null
    }
}

module.exports = { connecter, client, db, fermerConnexion }