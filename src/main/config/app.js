//  Core
const express = require('express')

//  Dependencies
const setupApp = require('./setup')

//  Routes
const setupRoutes = require('./routes')

//  Database
const MongoDB = require('../../infra/mongodb/connect')

//  Vars
const app = express()

//  Database
MongoDB()

//  Setups
setupApp(app)
setupRoutes(app)

module.exports = app
