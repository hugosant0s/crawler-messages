const EmailController = require('../controllers/email-ctrl.js')

class EmailRoute {
    static handlers(server) {
        server.post({ path: '/email/send-message', version: '1.0.0' }, EmailController.sendMessage)
        server.post({ path: '/email/schedule', version: '1.0.0' }, EmailController.saveMessageSchedule)
    }
}

module.exports = EmailRoute
