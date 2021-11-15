const passport = require('passport')

const local = require('./strategy/localStrategy')
const jwt = require('./strategy/jwtStrategy')

passport.use('local', local)
passport.use('jwt', jwt)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

module.exports = passport