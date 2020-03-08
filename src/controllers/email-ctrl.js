const EmailService = require('../services/email-service')
const EmailScheduleService = require('../services/email-schedule-service')

const RequestValidation = require('../validations/request-validation')

class EmailController {
    /**
     * 
     * @param {string} subject
     * @param {string} message
     * @param {object} emails
     * @param {property | array} emails.to
     * @param {property | array} emails.cc
     * @param {property | array} emails.cco
     */
    static async sendMessage(req, res, next) {
        try {
            const request = await RequestValidation.validateEmails(req.body)

            const info = await EmailService.sendMail(
                request.name, request.subject, request.message,
                request.emails.to, request.emails.cc, request.emails.cco
            )

            res.send({ message: `Email enviado com sucesso! ID: ${info.messageId}` })
        } catch (err) {
            const statusCode = (err.name === 'ValidationError') ? 400 : 500
            res.send(statusCode, { message: err.message })
        }

        return next()
    }

    /**
     *
     * @param {string} subject
     * @param {string} message
     * @param {object} emails
     * @param {property | array} emails.to
     * @param {property | array} emails.cc
     * @param {property | array} emails.cco
     * @param {string} typeOfTime
     * @param {number} time
     * @param {string} startDate
     * @param {string} endDate
     * @param {boolean} isActive
     */
    static async saveMessageSchedule(req, res, next) {
        try {
            const request = await RequestValidation.validateSchedule(req.body)

            await EmailScheduleService.createForEmail(
                request.typeOfTime, request.time, request.subject, request.message,
                request.emails.to, request.emails.cc, request.emails.cco,
                request.startDate, request.endDate, request.isActive
            )

            res.send({ message: 'Agendamento salvo com sucesso!' })
        } catch (err) {
            const statusCode = (err.name === 'ValidationError') ? 400 : 500
            res.send(statusCode, { message: err.message })
        }

        return next()
    }
}

module.exports = EmailController
