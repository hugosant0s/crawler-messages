const pool = require('../database/mysql')

class User {
    constructor() {
    }

    getDefaultUser() {
        return {
            'id': null,
            'name': null,
            'cpf': null,
            'createdAt': null,
            'updatedAt': null,
            'deletedAt': null
        }
    }

    async findAll() {
        let sql = 'SELECT * FROM send_message.users;'
        return await pool.query(sql)
    }
}

module.exports = User