class Facebook {
    constructor() {

    }

    async sendMessage(req, res) {
        res.send('Sended message to Facebook')
    }
}

module.exports = Facebook