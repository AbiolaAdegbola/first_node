class Utilisateur {
    constructor(nom, email, telephone, message) {
        this.nom = nom;
        this.email = email;
        this.telephone = telephone;
        this.message = message;
    }
}

module.exports = { Utilisateur }