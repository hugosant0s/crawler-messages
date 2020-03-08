const _ = require('lodash')
const moment = require('moment')
const schedule = require('node-schedule')

const EmailScheduleService = require('./email-schedule-service')
const EmailService = require('./email-service')

class ProcessService {
    static replaceReservedWords(message, endDate) {
        if (endDate) {
            if (/@MONTHS_REMAINING@/.test(message)) {
                const monthsRemaining = moment(endDate).diff(moment(), 'months')
                message = message.replace(/@MONTHS_REMAINING@/g, monthsRemaining)
            } else if (/@DAYS_REMAINING@/.test(message)) {
                const daysRemaining = moment(endDate).diff(moment(), 'days')
                message = message.replace(/@DAYS_REMAINING@/g, daysRemaining)
            } else if (/@HOURS_REMAINING@/.test(message)) {
                const hoursRemaining = moment(endDate).diff(moment(), 'hours')
                message = message.replace(/@HOURS_REMAINING@/g, hoursRemaining)
            } else if (/@MINUTES_REMAINING@/.test(message)) {
                const minutesRemaining = moment(endDate).diff(moment(), 'minutes')
                message = message.replace(/@MINUTES_REMAINING@/g, minutesRemaining)
            }
        }

        return message
    }

    static async process(schedule) {
        console.log('-----')
        console.log(`PROCESS OF ID: ${schedule.id} | Started at: ${moment().format('YYYY-MM-DD HH:mm:ss')}`)

        const name = ''
        const to = schedule.to.split(',')

        if (schedule.plataform === 'EMAIL') {
            console.log('SENDING EMAIL...')

            schedule.message = ProcessService.replaceReservedWords(schedule.message, schedule.endDate)

            console.log(schedule.message)

            const cc = schedule.cc.split(',')
            const cco = schedule.cco.split(',')
            const info = await EmailService.sendMail(name, schedule.subject, schedule.message, to, cc, cco)

            console.log(`EMAIL SENDED | ID: ${info.messageId} | RESPONSE: ${info.response}`)
            console.log(`ACCEPTED BY: ${_.join(info.accepted, ',')}`)
            console.log(`REJECTED BY: ${_.join(info.rejected, ',')}`)
        }

        await EmailScheduleService.updateLastExecutedAt(schedule.id)
        console.log('-----')
    }

    static getDateByTypeOfTime(typeOfTime = 'MINUTE', time = '1', lastExecutedAt) {
        let date = moment(lastExecutedAt)

        if (typeOfTime === 'MINUTE') {
            date = date.add(time, 'minutes')
        } else if (typeOfTime === 'HOUR') {
            date = date.add(time, 'hours')
        } else if (typeOfTime === 'DAY') {
            date = date.add(time, 'days')
        }

        return date
    }

    static async findAllToProcess() {
        const schedules = await EmailScheduleService.findAllToProcess()

        if (schedules && schedules.length > 0) {
            for (let i = 0; i < schedules.length; i++) {
                const schedule = schedules[i]
                const scheduleDate = ProcessService.getDateByTypeOfTime(schedule.typeOfTime, schedule.time, schedule.lastExecutedAt)

                if (!schedule.lastExecutedAt || !moment().isBefore(scheduleDate)) {
                    await ProcessService.process(schedule)
                }
            }
        }
    }

    static async start() {
        schedule.scheduleJob('*/10 * * * * *', () => {
            ProcessService.findAllToProcess()
        })
    }
}

module.exports = ProcessService
