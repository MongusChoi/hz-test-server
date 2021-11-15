const { ObjectId } = require('mongodb')
const { connection } = require('mongoose')
const userColl = connection.collection('users')

module.exports = {
    GetItemByEmail: async (param = {}) => {
        const { id } = param
        return await userColl.findOne({ id })
    },

    IsExist: async (param = {}) => {
        const { _id } = param

        return (await userColl.countDocuments({ _id: new ObjectId(_id) })) > 0
    }
}