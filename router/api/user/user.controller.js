const userDB = require('../../../models/users')

exports.GetNickname = async (req, res) => {
    const { _id } = req.user

    try {
        const { name } = await userDB.GetItem({ _id })
        res.send({ nickname: name })
    } catch (e) {
        console.log(e)
        res.status(500).send('server error')
    }
}