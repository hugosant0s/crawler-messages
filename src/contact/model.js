const pool = require('../database/mysql')

class Contact {
    constructor() {
    }

    getDefaultContact() {
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

    async findAllByUser(idUser) {
        let sql = 'SELECT * FROM send_message.contacts WHERE id_user = ?;'
        return await pool.query(sql, [idUser])
    }
}

module.exports = Contact