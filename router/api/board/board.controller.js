const BoardDB = require('../../../models/board')
const UserDB = require('../../../models/users')

exports.GetBoardList = async (req, res) => {
    try {
        const boards = await BoardDB.GetList()
        let result

        if (Array.isArray(boards) && boards.length > 0) {
            result = await Promise.all(boards.map(async item => {
                const { _id, title, author, createdAt, isDeleted } = item
                const nickname = await UserDB.GetNicknameById(author)
                return { _id, title, author, createdAt, nickname, isDeleted }
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
        BoardDB.Create({ title, body, author: _id })
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
        const result = await BoardDB.GetItem({ _id: id })
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send('Server Error')
    }
}

exports.UpdateBoardItem = async (req, res) => {
    const { id } = req.params
    const { title, body } = req.body

    try {
        if (!id || id.length !== 24) return res.status(400).send('Bad Request Query Parameter')
        if (!title || !body) return res.status(400).send('Bad Request Body')
        const result = await BoardDB.UpdateItem({ _id: id, title, body })
        if (result.matchedCount === 0) return res.status(404).send('Not Found')
        res.send('Success')
    } catch (e) {
        console.log(e)
        res.status(500).send('Server Error')
    }
}

exports.DeleteBoardItem = async (req, res) => {
    const { id } = req.params
    
    try {
        if (!id || id.length !== 24) return res.status(400).send('Bad Request Query Parameter')
        const result = await BoardDB.DeleteItem({ _id: id })
        if (result.matchedCount === 0) return res.status(404).send('Not Found')
        res.send('Success')
    } catch (e) {
        console.log(e)
        res.status(500).send('Server Error')
    }
}