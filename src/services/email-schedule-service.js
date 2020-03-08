const _ = require('lodash')
const moment = require('moment')

const Schedule = require('../models/schedule')

class EmailScheduleService {
    static validateRequest(request) {
        if (!request.typeOfTime || !request.time) {
            return {
                error: true,
                message: 'Favor informar período'
            }
        } else if (request.typeOfTime !== 'MINUTE' && request.typeOfTime !== 'HOUR' && request.typeOfTime !== 'DAY') {
            return {
                error: true,
                message: 'O perído deve ser em Minuto, Hora ou Dia'
            }
        } else if (!_.isNumber(request.time)) {
            return {
                error: true,
                message: 'Tempo inválido, favor digitar apenas números'
            }
        } else if (request.time.toString().length > 6) {
            return {
                error: true,
                message: 'O tempo deve conter no máximo 6 dígitos'
            }
        } else if (!request.startDate) {
            return {
                error: true,
                message: 'Favor informar a data e hora de início'
            }
        } else {
            try {
                if (moment(request.startDate).isBefore(moment())) {
                    return {
                        error: true,
                        message: 'A data e hora de início não pode ser no passado'
                    }
                }
            } catch (err) {
                return {
                    error: true,
                    message: 'Data e hora de início inválida. O formato aceito é: YYYY-MM-DD HH:mm:ss'
                }
            }

            if (request.endDate) {
                try {
                    if (!moment(request.endDate).isAfter(moment(request.startDate))) {
                        return {
                            error: true,
                            message: 'A data e hora final deve ser depois da data de início'
                        }
                    }
                } catch (err) {
                    console.log(err)
                    return {
                        error: true,
                        message: 'Data e hora final inválida. O formato aceito é: YYYY-MM-DD HH:mm:ss'
                    }
                }
            }

            if (typeof request.isActive !== 'undefined') {
                if (!_.isBoolean(request.isActive)) {
                    return {
                        error: true,
                        message: 'Ativo deve ser true ou false'
                    }
                }
            }
        }

        return {
            error: false,
            message: ''
        }
    }

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
