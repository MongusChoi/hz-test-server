const { ObjectId } = require('mongodb')
const { connection } = require('mongoose')
const boardColl = connection.collection('boards')

module.exports = {
    UpdateItem: async (param = {}) => {
        const { _id, title, body } = param
        
        return boardColl.updateOne({ _id: new ObjectId(_id) }, { $set: { title, body } })
    }
}