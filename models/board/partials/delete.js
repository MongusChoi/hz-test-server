const { ObjectId } = require('mongodb')
const { connection } = require('mongoose')
const boardColl = connection.collection('boards')

module.exports = {
    DeleteItem: async (param = {}) => {
        const { _id } = param
        
        return boardColl.updateOne({ _id: new ObjectId(_id) }, { $set: { isDeleted: true } })
    }
}