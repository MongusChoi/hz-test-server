const router = require('express').Router()
const controller = require('./board.controller')
const passport = require('passport')

router.get('/', controller.GetBoardList)

router.use(passport.authenticate('jwt'))

router.get('/:id', controller.GetBoardItem)
router.post('/', controller.CreateBoard)

module.exports = router