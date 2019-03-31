const Schedule = require('./model')
const _ = require('lodash')

class ScheduleService {
    constructor() {
        this.model = new Schedule()
    }

    async findAllToProcess() {
        let schedules = []
        _.forEach(await this.model.findAllToProcess(), (schedule) => {
            schedules.push({
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
            })
        })

        return schedules
    }

    async createForEmail(typeOfTime, time, subject, message, to, cc, cco, startDate, endDate, isActive = false) {
        let plataform = 'EMAIL'
        let toInString = _.join(to, ',')
        let ccInString = _.join(cc, ',')
        let ccoInString = _.join(cco, ',')
        await this.model.create(plataform, typeOfTime, time, subject, message, toInString, ccInString, ccoInString, startDate, endDate, isActive)
    }

    async createForWhatsapp(typeOfTime, time, subject, message, to, startDate, endDate, isActive = false) {
        let plataform = 'WHATSAPP'
        let toInString = _.join(to, ',')
        await this.model.create(plataform, typeOfTime, time, subject, message, toInString, null, null, startDate, endDate, isActive)
    }

    async createForFacebook(typeOfTime, time, subject, message, to, startDate, endDate, isActive = false) {
        let plataform = 'FACEBOOK'
        let toInString = _.join(to, ',')
        await this.model.create(plataform, typeOfTime, time, subject, message, toInString, null, null, startDate, endDate, isActive)
    }

    async updateLastExecutedAt(id) {
        await this.model.updateLastExecutedAt(id)
    }
}

module.exports = ScheduleService