const EmailService = require('../services/email-service')
const EmailScheduleService = require('../services/email-schedule-service')

class EmailController {
    static async sendMessage(req, res, next) {
        let response = EmailService.validateRequest(req.body)

        if (response.error) {
            res.send(400, { 'message': response.message })
            return next()
        }

        try {
            const info = await EmailService.sendMail(
                req.body.name, req.body.subject, req.body.message,
                req.body.emails.to, req.body.emails.cc, req.body.emails.cco
            )

            response.message = `Email enviado com sucesso! ID: ${info.messageId}`
        } catch (err) {
            console.log(err)

            response.error = true
            response.message = err.message
        }

        res.send(response)
        return next()
    }

    static async saveMessageSchedule(req, res, next) {
        let response = EmailService.validateRequest(req.body)
        response = EmailScheduleService.validateRequest(req.body)

        if (response.error) {
            res.send(400, { message: response.message })
            return next()
        }

        try {
            await EmailScheduleService.createForEmail(
                req.body.typeOfTime, req.body.time, req.body.subject, req.body.message,
                req.body.emails.to, req.body.emails.cc, req.body.emails.cco,
                req.body.startDate, req.body.endDate, req.body.isActive
            )

            response.message = 'Agendamento salvo com sucesso!'
        } catch (err) {
            console.log(err)

            response.error = true
            response.message = err.message
        }

        res.send(response)
        return next()
    }
}

module.exports = EmailController
