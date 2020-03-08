const WhatsappController = require('../controllers/whatsapp-ctrl.js')

class WhatsappRoute {
    static handlers(server) {
        server.post('/whatsapp/send-message', WhatsappController.sendMessage)
    }
}

module.exports = WhatsappRoute
