const userDB = require('../../../models/users')
const jwt = require('jsonwebtoken')
const config = require('../../../global')

const issueToken = (user) => {
    const { _id } = user

    return new Promise((resolve, reject) => {
        jwt.sign(
            { _id },
            config.SECRET,
            { expiresIn: '12h', issuer: 'mongus' },
            (err, token) => {
                if (err) return reject(err)
                else {
                    return resolve(token)
                }
            })
    })
}

exports.SignUp = async (req, res) => {
    const {
        name,
        id,
        password,
        email,
        birth,
        gender,
        conditionChecked,
        personalChecked,
        personalChecked2,
        emailChecked,
        smsChecked,
        appChecked
    } = req.body

    try {
        await userDB.Create({
            name,
            id,
            password,
            email,
            birth,
            gender,
            conditionChecked,
            personalChecked,
            personalChecked2,
            emailChecked,
            smsChecked,
            appChecked
        })

        res.send('success')
    } catch (e) {
        console.log(e)
        res.status(500).send('Server Error')
    }
}

exports.SignIn = async (req, res) => {
    const { _id } = req.user
    const token = await issueToken(req.user)
    res.send({ token })
}