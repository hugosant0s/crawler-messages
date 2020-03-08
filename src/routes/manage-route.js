const EmailRoute = require('../routes/email-route')
const WhatsappRoute = require('../routes/whatsapp-route')
const FacebookRoute = require('../routes/facebook-route')

const RequestValidation = require('../validations/request-validation')

class ManageRoute {
    static bootstrap(server) {
        server.use(ManageRoute.validateBaseRequest)

        EmailRoute.handlers(server)
        WhatsappRoute.handlers(server)
        FacebookRoute.handlers(server)
    }

    static async validateBaseRequest(req, res, next) {
        try {
            await RequestValidation.validateMessage(req.body)
        } catch (err) {
            const statusCode = (err.name === 'ValidationError') ? 400 : 500
            res.send(statusCode, { message: err.message })
            return next(false)
        }

        return next()
    }
}

module.exports = ManageRoute
