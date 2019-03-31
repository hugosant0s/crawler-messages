class Whatsapp {
    constructor() {

    }

    async sendMessage(req, res) {
        res.send('Message sended to Whatsapp')
    }
}

module.exports = Whatsapp