const router = require('express').Router()
const controller = require('./user.controller')
const passport = require('passport')

router.use(passport.authenticate('jwt'))

router.get('/nickname', controller.GetNickname)
router.get('/mypage', controller.GetMyData)
router.get('/data', controller.GetUserData)

module.exports = router