const _ = require('lodash')

const Schedule = require('../models/schedule')

class EmailScheduleService {
    static async findAllToProcess() {
        const schedules = await Schedule.findAllToProcess()

        if (schedules && schedules.length > 0) {
            return schedules.map((schedule) => {
                return {
                    'id': schedule.id,
                    'plataform': schedule.plataform,
                    'typeOfTime': schedule.type_of_time,
                    'time': schedule.time,
                    'subject': schedule.subject,
                    'message': schedule.message,
                    'to': schedule.to,
                    'cc': schedule.cc || '',
                    'cco': schedule.cco || '',
                    'endDate': schedule.end_date,
                    'lastExecutedAt': schedule.last_executed_at
                }
            })
        }
    }

    static async createForEmail(typeOfTime, time, subject, message, to, cc, cco, startDate, endDate, isActive = false) {
        const plataform = 'EMAIL'
        const toInString = _.join(to, ',')
        const ccInString = _.join(cc, ',')
        const ccoInString = _.join(cco, ',')
        await Schedule.create(plataform, typeOfTime, time, subject, message, toInString, ccInString, ccoInString, startDate, endDate, isActive)
    }

    static async createForWhatsapp(typeOfTime, time, subject, message, to, startDate, endDate, isActive = false) {
        const plataform = 'WHATSAPP'
        const toInString = _.join(to, ',')
        await Schedule.create(plataform, typeOfTime, time, subject, message, toInString, null, null, startDate, endDate, isActive)
    }

    static async createForFacebook(typeOfTime, time, subject, message, to, startDate, endDate, isActive = false) {
        const plataform = 'FACEBOOK'
        const toInString = _.join(to, ',')
        await Schedule.create(plataform, typeOfTime, time, subject, message, toInString, null, null, startDate, endDate, isActive)
    }

    static async updateLastExecutedAt(id) {
        await Schedule.updateLastExecutedAt(id)
    }
}

module.exports = EmailScheduleService
