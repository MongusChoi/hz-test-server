const router = require('express').Router()
const controller = require('./auth.controller')

router.post('/sign-up', controller.SignUp)

module.exports = router