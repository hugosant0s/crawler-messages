global.__basedir = __dirname;

require('dotenv').config({path: './env/.env'})

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()

const Route = require('./src/routes/service')
const Process = require('./src/process')

app.use(express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

new Route(app, router).addRoutes()
new Process().start()

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})