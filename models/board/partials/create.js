const { ObjectId } = require('mongodb')
const { connection } = require('mongoose')
const boardColl = connection.collection('boards')

module.exports = {
    Create: (param = {}) => {
        const {
            title,
            body,
            author
        } = param

        return boardColl.insertOne({
            title,
            body,
            author: new ObjectId(author),
            createdAt: new Date()
        })

    }
}