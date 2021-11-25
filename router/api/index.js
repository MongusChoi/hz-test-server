const router = require('express').Router()

const path = [
    '/auth',
    '/comment',
    '/user',
    '/board'
]

path.forEach(item => router.use(item, require(`.${item}`)))

module.exports = router