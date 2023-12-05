const express = require('express')
const { connexion_page } = require('../controller/utilisateur')

let route_connect = express.Router()

route_connect.route('/connexion').post(connexion_page)

module.exports = {route_connect};