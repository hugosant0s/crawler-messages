const pool = require('../databases/mysql')

class Contact {
    static getDefault() {
        return {
            'id': null,
            'idUser': null,
            'type': null,
            'value': null,
            'createdAt': null,
            'updatedAt': null,
            'deletedAt': null
        }
    }

    static async findAllByUser(idUser) {
        let sql = 'SELECT * FROM send_message.contacts WHERE id_user = ?;'
        return await pool.query(sql, [idUser])
    }
}

module.exports = Contact
