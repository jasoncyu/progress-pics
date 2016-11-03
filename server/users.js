const passport = require('passport');
const express = require('express')
const LocalStrategy = require('passport-local').Strategy
const db = require('./db')

const router = new express.Router({
  mergeParams: true,
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

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(JSON.stringify({ status: 'Success' }))
})

router.post('/', (req, res, next) => {
  db.User.create(req.body, (err, user) => {
    if (err) next(err)
    res.send(JSON.stringify(user))
  })
})

router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({
    message: 'Oops, something went wrong. Try again?',
  })
})

module.exports = router
