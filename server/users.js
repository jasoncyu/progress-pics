const passport = require('passport');
const express = require('express')
const LocalStrategy = require('passport-local').Strategy
const db = require('./db')

const router = new express.Router({
  mergeParams: true,
})

router.post('/', (req, res) => {
  db.User.create(req.body, (err, user) => {
    if (err) res.send(err)
    res.send(JSON.stringify(user))
  })
})

passport.use(new LocalStrategy(
  (email, password, done) => {
    db.User.findOne({ email }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.isValidPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }))

module.exports = router
