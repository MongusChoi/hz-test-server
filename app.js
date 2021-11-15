const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app)
const mongoose = require('mongoose')
const db = mongoose.connection
const config = require('./global')
const passport = require('./middleware/passport')
const session = require('express-session')

const port = process.env.PORT || 2008

app.use(cors())
app.use(bodyParser.urlencoded({ limit: '4096mb', extended: true, parameterLimit: 500000000 }))
app.use(bodyParser.json({ limit: '4096mb', type: 'application/json' }))

app.use(session({ maxAge: 86400000, secret: `secret`, resave: true, saveUninitialized: true }))

app.use(passport.initialize())
app.use(passport.session())

server.listen(port, function () {
    console.log('[system] Open | Port : ' + port)
})

app.get('/', (req, res) => { res.send('hi') })
app.use('/api', require('./router/api'))

mongoose.connect(config.MONGO_CONNECTION_STRING, { dbName: config.MONGO_DB_NAME })
db.on('error', console.error)
db.once('open', () => {
    console.log('[system] mongodb connect')
})