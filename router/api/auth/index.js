const router = require('express').Router()
const controller = require('./auth.controller')
const passport = require('passport')

router.post('/sign-up', controller.SignUp)
router.post('/sign-in', passport.authenticate('local'), controller.SignIn)

module.exports = router