const router = require('express').Router()
const controller = require('./comment.controller')
const passport = require('passport')

router.use(passport.authenticate('jwt'))

router.get('/', controller.GetComment)
router.post('/', controller.CreateComment)

module.exports = router