const UserDB = require('../../../models/users')

exports.GetNickname = async (req, res) => {
    const { _id } = req.user

    try {
        const { name } = await UserDB.GetItem({ _id })
        res.send({ nickname: name })
    } catch (e) {
        console.log(e)
        res.status(500).send('server error')
    }
}

exports.GetMyData = async (req, res) => {
    const { _id } = req.user

    try {
        const result = await UserDB.GetItem({ _id })
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send('server error')
    }
}

exports.GetUserData = (req, res) => {
    const { _id } = req.user
    res.send({ _id })
}