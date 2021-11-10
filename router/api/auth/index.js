const router = require('express').Router()
const controller = require('./auth.controller')

router.get('/', controller.getTest)

module.exports = router