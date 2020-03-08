const _ = require('lodash')
const validator = require('validator')

const handlebars = require('handlebars')

const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)

const EmailConfig = require('../config/email-config')

class EmailService {
    static validateRequest(request) {
        if (_.isEmpty(request.emails) || !request.emails.to || request.emails.to.length === 0) {
            return {
                error: true,
                message: 'Favor informar pelo menos um email de destinatário'
            }
        }
        else {
            for (let i = 0; i < request.emails.to.length; i++) {
                if (!validator.isEmail(request.emails.to[i])) {
                    return {
                        error: true,
                        message: 'Email inválido de um destinatário!'
                    }
                }
            }

            if (request.emails.cc && request.emails.cc.length > 0) {
                for (let i = 0; i < request.emails.cc.length; i++) {
                    if (!validator.isEmail(request.emails.cc[i])) {
                        return {
                            error: true,
                            message: 'Email inválido de um destinatário em cópia!'
                        }
                    }
                }
            }

            if (request.emails.cco && request.emails.cco.length > 0) {
                for (let i = 0; i < request.emails.cco.length; i++) {
                    if (!validator.isEmail(request.emails.cco[i])) {
                        return {
                            error: true,
                            message: 'Email inválido de um destinatário em cópia oculto!'
                        }
                    }
                }
            }
        }

        if (!request.subject) {
            return {
                error: true,
                message: 'Favor informar o assunto'
            }
        } else if (request.subject.length < 5) {
            return {
                error: true,
                message: 'O assunto deve conter no mínimo 5 caracteres'
            }
        } else if (request.subject.length > 50) {
            return {
                error: true,
                message: 'O assunto deve conter no máximo 50 caracteres'
            }
        }

        return {
            error: false,
            message: ''
        }
    }

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
