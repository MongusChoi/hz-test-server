const router = require('express').Router()

const path = [
    '/auth'
]

path.forEach(item => router.use(item, require(`.${item}`)))

module.exports = router