const { ObjectId } = require('mongodb')
const { connection } = require('mongoose')
const boardColl = connection.collection('boards')

module.exports = {
    GetList: async (param = {}, options = {}) => {
        const {} = param
        const { skip, limit } = options

        return await boardColl.find({}, { skip, limit }).toArray()
    },

    GetItem: async (param = {}) => {
        const { _id } = param
        return await boardColl.findOne({ _id: new ObjectId(_id) })
    },

    GetCount: (param = {}) => {
        return boardColl.countDocuments({})
    }
}