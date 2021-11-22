const router = require('express').Router()
const controller = require('./user.controller')
const passport = require('passport')

router.use(passport.authenticate('jwt'))

router.get('/nickname', controller.GetNickname)

module.exports = router