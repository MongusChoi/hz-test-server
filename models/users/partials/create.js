const crypto = require('crypto')
const { connection } = require('mongoose')
const userColl = connection.collection('users')
const { SECRET } = require('../../../global')

module.exports = {
    Create: async (param = {}) => {
        const {
            name,
            id,
            password,
            email,
            birth,
            gender,
            conditionChecked,
            personalChecked,
            personalChecked2,
            emailChecked,
            smsChecked,
            appChecked
        } = param

        let encryptedPwd = ''
        if (password) {
            encryptedPwd = crypto.createHmac('sha1', SECRET)
                .update(password)
                .digest('base64')
        }

        return userColl.insertOne({
            name,
            id,
            password: encryptedPwd,
            email,
            birth,
            gender,
            conditionChecked,
            personalChecked,
            personalChecked2,
            emailChecked,
            smsChecked,
            appChecked
        })

    }
}