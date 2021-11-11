const { connection } = require('mongoose')
const commentColl = connection.collection('comments')

module.exports = {
    Create: async (param = {}) => {
        const { nickname, commentValue } = param

        return commentColl.insertOne({ nickname, commentValue, date: new Date() })

    }
}