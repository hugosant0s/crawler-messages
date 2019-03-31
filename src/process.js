const schedule = require('node-schedule');
const moment = require('moment')
const _ = require('lodash')

const ScheduleProcess = require('./schedule/service')
const Email = require('./email/service')

class Process {
    constructor() {
        this.scheduleProcess = new ScheduleProcess()
        this.email = new Email()
    }

    async start() {
        schedule.scheduleJob('*/10 * * * * *', () => {
            this.findAllToProcess()
        });
    }

    async findAllToProcess() {
        let schedules = await this.scheduleProcess.findAllToProcess()
        if (schedules && schedules.length > 0) {
            for (let i = 0; i < schedules.length; i++) {
                let schedule = schedules[i]
                let scheduleDate = this.getDateByTypeOfTime(schedule.typeOfTime, schedule.time, schedule.lastExecutedAt)

                if (!schedule.lastExecutedAt || !moment().isBefore(scheduleDate)) {
                    await this.process(schedule)
                }
            }
        }
    }

    getDateByTypeOfTime(typeOfTime = 'MINUTE', time = '1', lastExecutedAt) {
        let date = moment(lastExecutedAt)

        if (typeOfTime === 'MINUTE') {
            date = date.add(time, 'minutes')
        }
        else if (typeOfTime === 'HOUR') {
            date = date.add(time, 'hours')
        }
        else if (typeOfTime === 'DAY') {
            date = date.add(time, 'days')
        }

        return date
    }

    async process(schedule) {
        let now = moment().format('YYYY-MM-DD HH:mm:ss')
        console.log(`-----`)
        console.log(`PROCESS OF ID: ${schedule.id} | Started at: ${now}`)

        let name = ''
        let to = schedule.to.split(',')

        if (schedule.plataform === 'EMAIL') {
            console.log(`SENDING EMAIL...`)

            schedule.message = this.replaceReservedWords(schedule.message, schedule.endDate)

            console.log(schedule.message)

            let cc = schedule.cc.split(',')
            let cco = schedule.cco.split(',')
            let info = await this.email.sendMail(name, schedule.subject, schedule.message, to, cc, cco)

            console.log(`EMAIL SENDED | ID: ${info.messageId} | RESPONSE: ${info.response}`)
            console.log(`ACCEPTED BY: ${_.join(info.accepted, ',')}`)
            console.log(`REJECTED BY: ${_.join(info.rejected, ',')}`)
        }

        await this.scheduleProcess.updateLastExecutedAt(schedule.id)
        console.log(`-----`)
    }

    replaceReservedWords(message, endDate) {
        if (endDate) {
            if (/@MONTHS_REMAINING@/.test(message)) {
                let monthsRemaining = moment(endDate).diff(moment(), 'months')
                message = message.replace(/@MONTHS_REMAINING@/g, monthsRemaining)
            }
            else if (/@DAYS_REMAINING@/.test(message)) {
                let daysRemaining = moment(endDate).diff(moment(), 'days')
                message = message.replace(/@DAYS_REMAINING@/g, daysRemaining)
            }
            else if (/@HOURS_REMAINING@/.test(message)) {
                let hoursRemaining = moment(endDate).diff(moment(), 'hours')
                message = message.replace(/@HOURS_REMAINING@/g, hoursRemaining)
            }
            else if (/@MINUTES_REMAINING@/.test(message)) {
                let minutesRemaining = moment(endDate).diff(moment(), 'minutes')
                message = message.replace(/@MINUTES_REMAINING@/g, minutesRemaining)
            }
        }

        return message
    }
}

module.exports = Process