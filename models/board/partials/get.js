const { ObjectId } = require('mongodb')
const { connection } = require('mongoose')
const boardColl = connection.collection('boards')

module.exports = {
    GetList: async (param = {}) => {
        const {} = param
        return await boardColl.find({}).toArray()
    },

    GetItem: async (param = {}) => {
        const { _id } = param
        return await boardColl.findOne({ _id: new ObjectId(_id) })
    }
}