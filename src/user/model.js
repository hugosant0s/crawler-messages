const pool = require('../database/mysql')

class User {
    constructor() {
    }

    async findAll() {
        let sql = 'SELECT * FROM send_message.users;'
        return await pool.query(sql)
    }
}

module.exports = User