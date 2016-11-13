const passport = require('passport');
const express = require('express')
const LocalStrategy = require('passport-local').Strategy
const db = require('./db')

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
  console.log('serializeUser');
  console.log('user: ', user)
  done(null, user._id)
})
passport.deserializeUser((id, done) => {
  console.log('deserializeUser')
  db.User.findById(id, (err, user) => {
    console.log('user: ', user)
    done(err, user)
  })
})

const ensureAuthenticated = (req, res, next) => {
  console.log('req.user: ', req.user)
  if (req.isAuthenticated()) {
    next()
  } else {
    res.setHeader('Content-Type', 'application/json')
    res.status(400).send(JSON.stringify({
      message: 'Please log in to do that.',
    }))
  }
}

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('req.user: ', req.user)
  console.log('req.session: ', req.session)
  res.send(JSON.stringify({ user: req.user }))
})


router.post('/logout', (req, res) => {
  req.logout()
  res.send(JSON.stringify({ message: 'Success' }))
})

router.post('/is-logged-in', ensureAuthenticated, (req, res) => {
  console.log('req.cookie: ', req.cookie)
  if (req.user) {
    res.send(JSON.stringify({
      isLoggedIn: true,
    }))
  } else {
    res.send(JSON.stringify({
      isLoggedIn: false,
    }))
  }
})

router.post('/', (req, res, next) => {
  console.log('req.body: ', req.body)
  db.User.create(req.body, (err, user) => {
    if (err) next(err)
    res.send(JSON.stringify(user))
  })
})

router.use((err, req, res, next) => {
  /* res.status(500).send({
   *   message: 'Oops, something went wrong. Try again?',
   * })*/

  console.error(err)
  console.error(err.stack)
  res
    .status(500)
    .send({
      message: err.message,
      err,
    })
  /* res.status(500).send(JSON.stringify(err, null, 2))*/
})

module.exports = router
