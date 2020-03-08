const FacebookController = require('../controllers/facebook-ctrl.js')

class FacebookRoute {
    static handlers(server) {
        server.post('/facebook/send-message', FacebookController.sendMessage)
    }
}

module.exports = FacebookRoute
