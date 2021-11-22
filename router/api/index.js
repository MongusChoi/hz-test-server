const router = require('express').Router()

const path = [
    '/auth',
    '/comment',
    '/user'
]

path.forEach(item => router.use(item, require(`.${item}`)))

module.exports = router