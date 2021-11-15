const passportLocal = require('passport-local')
const crypto = require('crypto')
const userDB = require('../../../models/users/index')
const config = require('../../../global')

const LocalStrategy = passportLocal.Strategy

module.exports = new LocalStrategy({
  usernameField: 'id',
  passwordField: 'password',
  session: false
}, async (username, password, done) => {
  try {
      const user = await userDB.GetItemByEmail({ id: username })

      if (!user) {
          return done(null, false) //유저가 없음
      }

      const encrypted = crypto.createHmac('sha1', config.SECRET)
          .update(password)
          .digest('base64')
          
      if (user.password !== encrypted){
          return done(null, false) //패스워드가 틀림
      }
      
      return done(null, { _id: user._id }) //로컬 인증 성공
  }
  catch (err) {
      done(null, { error: err })
  }
})