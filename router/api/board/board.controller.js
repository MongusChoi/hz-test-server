const boardDB = require('../../../models/board')
const userDB = require('../../../models/users')

exports.GetBoardList = async (req, res) => {
    try {
        const boards = await boardDB.GetList()
        let result

        if (Array.isArray(boards) && boards.length > 0) {
            result = await Promise.all(boards.map(async item => {
                const { _id, title, author, createdAt } = item
                const nickname = await userDB.GetNicknameById(author)
                return { _id, title, author, createdAt, nickname }
            }))
        }
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send('Server Error')
    }
}

exports.CreateBoard = async (req, res) => {
    const { _id } = req.user
    const { title, body } = req.body

    try {
        if (!title || !body) return res.status(400).send('Bad Request Body')
        boardDB.Create({ title, body, author: _id })
        res.send('Success')
    } catch (e) {
        console.log(e)
        res.status(500).send('Server Error')
    }
}

exports.GetBoardItem = async (req, res) => {
    const { id } = req.params

    try {
        if (!id || id.length !== 24) return res.status(400).send('Bad Request Query Parameter')
        const result = await boardDB.GetItem({ _id: id })
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send('Server Error')
    }
}