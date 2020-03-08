require('dotenv').config({ path: './env/.env' })

const restify = require('restify')

const ManageRoute = require('./src/routes/manage-route')
const Router = require('./src/config/router')
const Process = require('./src/services/process-service')

const server = restify.createServer({ 'name': 'crawler-messages' })

server.pre(Router.handler.bind(this, 'api'))
server.pre(restify.plugins.pre.dedupeSlashes())
server.use(restify.plugins.fullResponse())
server.use(restify.plugins.gzipResponse())
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser({ 'mapParams': false }))
server.use(restify.plugins.jsonBodyParser({ 'mapParams': true }))

ManageRoute.bootstrap(server)
Process.start()

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})
