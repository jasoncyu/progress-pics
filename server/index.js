/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;

const passport = require('passport');
const session = require('express-session');
const cookieSession = require('cookie-session')
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
app.use(session({
  secret: 'asdfasdf',
  resave: false,
  // When this option is false, I get tons of session objects in my store.
  saveUninitialized: false,
  cookie: {
    // Need to comment this out for now for auth to work locally.
    // domain: '.progress-pics.com',
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
console.log('shared middleware added');

// Attach all the routes
const entriesRouter = require('./entries')
app.use('/entries', entriesRouter)
const usersRouter = require('./users')
app.use('/users', usersRouter)

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

app.use((err, req, res, next) => {
  /* res.status(500).send({
   *   message: 'Oops, something went wrong. Try again?',
   * })*/
  console.log('err middleware called');

  console.error(err)
  console.error(err.stack)
  res
    .status(500)
    .send({
      message: err.message,
      err: JSON.stringify(err),
    })
  /* res.status(500).send(JSON.stringify(err, null, 2))*/
})


// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(JSON.stringify(innerErr, null, 2));
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
});
