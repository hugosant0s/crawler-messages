const handlebars = require('handlebars')

const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)

const EmailConfig = require('../config/email-config')

class EmailService {
    static async sendMail(name = '', subject = '', message = '', to = [], cc = [], cco = []) {
        const html = await readFile(__basedir + '/public/templates/email.html', { encoding: 'utf-8' })
        const template = handlebars.compile(html)

        const htmlToSend = template({
            name: name,
            message: message
        })

        const mailOptions = EmailConfig.options

        mailOptions.to = to
        mailOptions.cc = cc
        mailOptions.cco = cco
        mailOptions.subject = subject
        mailOptions.text = message
        mailOptions.html = htmlToSend

        return await EmailConfig.transporter.sendMail(mailOptions)
    }
}

module.exports = EmailService
