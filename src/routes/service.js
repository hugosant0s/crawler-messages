const _ = require('lodash')
const Email = require('../email/service')
const Whatsapp = require('../whatsapp/service')
const Facebook = require('../facebook/service')

class Route {
    constructor(app, router) {
        this.app = app
        this.router = router

        this.email = new Email()
        this.whatsapp = new Whatsapp()
        this.facebook = new Facebook()
    }

    async addRoutes() {
        this.app.use('/send-message', this.router)

        this.router.use(this.validateRequest)

        this.router.post('/schedule/email', await this.email.saveMessageSchedule.bind(this.email))

        this.router.post('/email', await this.email.sendMessage.bind(this.email))
        this.router.post('/whatsapp', await this.whatsapp.sendMessage.bind(this.whatsapp))
        this.router.post('/facebook', await this.facebook.sendMessage.bind(this.facebook))
    }

    validateRequest(req, res, next) {
        let response = {
            error: false,
            message: ""
        }

        if (_.isEmpty(req.body)) {
            response.error = true
            response.message = "Favor informar os parâmetros"
        }
        else if (!req.body.message) {
            response.error = true
            response.message = "Favor informar a mensagem"
        }
        else if (req.body.message.length < 10) {
            response.error = true
            response.message = "A mensagem deve conter no mínimo 10 caracteres"
        }
        else if (req.body.message.length > 5000) {
            response.error = true
            response.message = "A mensagem deve conter no máximo 5000 caracteres"
        }

        if (response.error) {
            res.status(400)
            res.send(response) 
        }
        else {
            next()
        }
    }
}

module.exports = Route