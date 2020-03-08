const EmailRoute = require('../routes/email-route')
const WhatsappRoute = require('../routes/whatsapp-route')
const FacebookRoute = require('../routes/facebook-route')

class ManageRoute {
    static bootstrap(server) {
        server.use(ManageRoute.validateRequest)

        EmailRoute.handlers(server)
        WhatsappRoute.handlers(server)
        FacebookRoute.handlers(server)
    }

    static validateRequest(req, res, next) {
        let response = {
            error: false,
            message: ''
        }

        if (!req.body) {
            response.error = true
            response.message = 'Favor informar os parâmetros'
        } else if (!req.body.message) {
            response.error = true
            response.message = 'Favor informar a mensagem'
        } else if (req.body.message.length < 10) {
            response.error = true
            response.message = 'A mensagem deve conter no mínimo 10 caracteres'
        } else if (req.body.message.length > 5000) {
            response.error = true
            response.message = 'A mensagem deve conter no máximo 5000 caracteres'
        }

        if (response.error) {
            res.send(400, response)
            return next(false)
        }

        return next()
    }
}

module.exports = ManageRoute
