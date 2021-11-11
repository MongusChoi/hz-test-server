const { connection } = require('mongoose')
const commentColl = connection.collection('comments')

module.exports = {
    GetList: async (param = {}) => {
        const { skip, limit } = param
        const list = await commentColl.find({}, { skip, limit }).toArray()
        return { list }
    }
}