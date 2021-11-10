const userDB = require('../../../models/users')

exports.SignUp = (req, res) => {
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
        userDB.Create({
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