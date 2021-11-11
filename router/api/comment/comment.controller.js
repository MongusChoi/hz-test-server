const commentDB = require('../../../models/comment')

exports.GetComment = async (req, res) => {
    let { offset, limit } = req.query

    offset = isNaN(offset) ? 0 : Number(offset)
    limit = isNaN(limit) ? 12 : Number(limit)

    const skip = offset * limit

    try {   
        const result = await commentDB.GetList({ skip, limit })
        res.send(result)
    } catch (e) {
        console.log(e)
        res.statue(500).send('Server Error')
    }
}

exports.CreateComment = async (req, res) => {
    const { nickname, commentValue } = req.body

    try {
        if (!nickname) res.status(400).send('닉네임이 없음')
        if (!commentValue) res.status(400).send('코멘트가 없음')

        commentDB.Create({ nickname, commentValue })
        res.send('Success')
    } catch (e) {
        console.log(e)
        res.statue(500).send('Server Error')
    }
}