const passport = require('passport');
const express = require('express')
const LocalStrategy = require('passport-local').Strategy
const db = require('./db')

const ensureAuthenticated = require('./common').ensureAuthenticated

const router = new express.Router({
  mergeParams: true,
})

passport.use(new LocalStrategy(
  (username, password, done) => {
    db.User.findOne({ username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      user.isValidPassword(password, (passwordErr, isMatch) => {
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      })

      return done(null, user);
    });
  }))
passport.serializeUser((user, done) => {
  done(null, user._id)
})
passport.deserializeUser((id, done) => {
  db.User.findById(id, (err, user) => {
    done(err, user)
  })
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(JSON.stringify({ user: req.user }))
})


router.post('/logout', (req, res) => {
  // Passport docs say to use req.logout(), but that doesn't work, so I'm just
  // removing the session entry entirely.
  req.session.destroy((err) => {
    res.send(JSON.stringify({ message: 'Success' }))
  });
})

router.post('/get-current-user', ensureAuthenticated, (req, res) => {
  if (req.user) {
    res.send(JSON.stringify({
      user: req.user,
    }))
  } else {
    res.send(JSON.stringify({
      user: {},
    }))
  }
})

router.post('/', (req, res, next) => {
  db.User.create(req.body, (err, user) => {
    if (err) next(err)
    res.send(JSON.stringify(user))
  })
})

module.exports = router
