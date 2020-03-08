const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const options = {
    from: '"Hugo Santos" <hugosantos.2012@gmail.com>',
    to: [],
    cc: [],
    cco: [],
    subject: '',
    text: '',
    html: ''
}

class EmailConfig {
    static get transporter() {
        return transporter
    }

    static get options() {
        return options
    }
}

module.exports = EmailConfig
