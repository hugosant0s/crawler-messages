const pool = require('../databases/mysql')

class User {
    static getDefault() {
        return {
            'id': null,
            'name': null,
            'cpf': null,
            'createdAt': null,
            'updatedAt': null,
            'deletedAt': null
        }
    }

    static async findAll() {
        let sql = 'SELECT * FROM send_message.users;'
        return await pool.query(sql)
    }
}

module.exports = User
