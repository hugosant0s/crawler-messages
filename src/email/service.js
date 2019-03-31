const nodeMailer = require('nodemailer')
const handlebars = require('handlebars')
const validator = require('validator')
const _ = require('lodash')
const fs = require('fs')
const util = require('util')
const moment = require('moment')
const readFile = util.promisify(fs.readFile);

const ScheduleService = require('../schedule/service')

class Email {
    constructor() {
        this.scheduleService = new ScheduleService()

        this.transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        this.mailOptions = {
            from: '"Hugo Santos" <hugosantos.2012@gmail.com>',
            to: [],
            cc: [],
            cco: [],
            subject: '',
            text: '',
            html: ''
        };
    }

    async sendMessage(req, res) {
        let response = {
            error: false,
            message: ""
        }

        response = this.validateEmailRequest(req, response)

        if (response.error) {
            res.status(400)
        }
        else {
            try {
                let info = await this.sendMail(
                    req.body.name, req.body.subject, req.body.message,
                    req.body.emails.to, req.body.emails.cc, req.body.emails.cco
                )
                response.message = `Email enviado com sucesso! ID: ${info.messageId}`
            }
            catch(err) {
                console.log(err)

                response.error = true
                response.message = err.message
            }
        }

        res.send(response)
    }

    async saveMessageSchedule(req, res) {
        let response = {
            error: false,
            message: ""
        }

        response = this.validateEmailRequest(req, response)
        response = this.validateScheduleRequest(req, response)

        if (response.error) {
            res.status(400)
        }
        else {
            try {
                await this.scheduleService.createForEmail(
                    req.body.typeOfTime, req.body.time, req.body.subject, req.body.message,
                    req.body.emails.to, req.body.emails.cc, req.body.emails.cco,
                    req.body.startDate, req.body.endDate, req.body.isActive
                )

                response.message = 'Agendamento salvo com sucesso!'
            }
            catch(err) {
                console.log(err)

                response.error = true
                response.message = err.message
            }
        }

        res.send(response)
    }

    validateEmailRequest(req, response) {
        if (_.isEmpty(req.body.emails) || !req.body.emails.to || req.body.emails.to.length === 0) {
            response.error = true
            response.message = "Favor informar pelo menos um email de destinatário"
        }
        else {
            for (let i = 0; i < req.body.emails.to.length; i++) {
                if (!validator.isEmail(req.body.emails.to[i])) {
                    response.error = true
                    response.message = "Email inválido de um destinatário!"
                }
            }

            if (req.body.emails.cc && req.body.emails.cc.length > 0) {
                for (let i = 0; i < req.body.emails.cc.length; i++) {
                    if (!validator.isEmail(req.body.emails.cc[i])) {
                        response.error = true
                        response.message = "Email inválido de um destinatário em cópia!"
                    }
                }
            }

            if (req.body.emails.cco && req.body.emails.cco.length > 0) {
                for (let i = 0; i < req.body.emails.cco.length; i++) {
                    if (!validator.isEmail(req.body.emails.cco[i])) {
                        response.error = true
                        response.message = "Email inválido de um destinatário em cópia oculto!"
                    }
                }
            }
        }

        if (!req.body.subject) {
            response.error = true
            response.message = "Favor informar o assunto"
        }
        else if (req.body.subject.length < 5) {
            response.error = true
            response.message = "O assunto deve conter no mínimo 5 caracteres"
        }
        else if (req.body.subject.length > 50) {
            response.error = true
            response.message = "O assunto deve conter no máximo 50 caracteres"
        }

        return response
    }

    validateScheduleRequest(req, response) {
        if (!req.body.typeOfTime || !req.body.time) {
            response.error = true
            response.message = "Favor informar período"
        }
        else if (req.body.typeOfTime !== 'MINUTE' && req.body.typeOfTime !== 'HOUR' && req.body.typeOfTime !== 'DAY') {
            response.error = true
            response.message = "O perído deve ser em Minuto, Hora ou Dia"
        }
        else if (!util.isNumber(req.body.time)) {
            response.error = true
            response.message = "Tempo inválido, favor digitar apenas números"
        }
        else if (req.body.time.toString().length > 6) {
            response.error = true
            response.message = "O tempo deve conter no máximo 6 dígitos"
        }
        else if (!req.body.startDate) {
            response.error = true
            response.message = "Favor informar a data e hora de início"
        }
        else {
            try {
                if (moment(req.body.startDate).isBefore(moment())) {
                    response.error = true
                    response.message = "A data e hora de início não pode ser no passado"
                }
            }
            catch(err) {
                response.error = true
                response.message = "Data e hora de início inválida. O formato aceito é: YYYY-MM-DD HH:mm:ss"
            }

            if (req.body.endDate) {
                try {
                    if (!moment(req.body.endDate).isAfter(moment(req.body.startDate))) {
                        response.error = true
                        response.message = "A data e hora final deve ser depois da data de início"
                    }
                }
                catch(err) {
                    console.log(err)
                    response.error = true
                    response.message = "Data e hora final inválida. O formato aceito é: YYYY-MM-DD HH:mm:ss"
                }
            }

            if (typeof req.body.isActive !== 'undefined') {
                if (!util.isBoolean(req.body.isActive)) {
                    response.error = true
                    response.message = "Ativo deve ser true ou false"
                }
            }
        }

        return response
    }

    async sendMail(name = '', subject = '', message = '', to = [], cc = [], cco = []) {
        let html = await readFile(__basedir + '/public/templates/email.html', {encoding: 'utf-8'})
        let template = handlebars.compile(html);
        let replacements = {
            name: name,
            message: message
        }

        let htmlToSend = template(replacements);

        this.mailOptions.to = to
        this.mailOptions.cc = cc
        this.mailOptions.cco = cco
        this.mailOptions.subject = subject
        this.mailOptions.text = message
        this.mailOptions.html = htmlToSend

        return await this.transporter.sendMail(this.mailOptions)
    }
}

module.exports = Email