const pool = require('../database/mysql')
const moment = require('moment')

class Schedule {
    constructor() {
    }

    async findAllToProcess() {
        let isActive = true
        let now = moment().format('YYYY-MM-DD HH:mm:ss')

        let sql = 'SELECT * FROM `send_message`.`schedules` ' +
            'WHERE is_active = ? ' +
            'AND start_date <= ? ' +
            'AND (end_date is null OR end_date > ?);'

        return await pool.query(sql, [isActive, now, now])
    }

    async create(plataform, typeOfTime, time, subject, message, to, cc, cco, startDate, endDate, isActive = false) {
        let now = moment().format('YYYY-MM-DD HH:mm:ss')
        let sql = 'INSERT INTO `send_message`.`schedules` (plataform, type_of_time, `time`, `subject`, message, `to`, cc, cco, start_date, end_date, is_active, last_executed_at, created_at) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'

        return await pool.query(sql, [plataform, typeOfTime, time, subject, message, to, cc, cco, startDate, endDate, isActive, null, now])
    }

    async updateLastExecutedAt(id) {
        let now = moment().format('YYYY-MM-DD HH:mm:ss')
        let sql = 'UPDATE `send_message`.`schedules` SET last_executed_at = ? WHERE id = ?;'

        return await pool.query(sql, [now, id])
    }
}

module.exports = Schedule