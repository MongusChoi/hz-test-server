const router = require('express').Router()
const controller = require('./comment.controller')

router.get('/', controller.GetComment)
router.post('/', controller.CreateComment)

module.exports = router