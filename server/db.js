const mongoose = require('mongoose')

const config = require('./config')

// Use native ES6 Promises over Mongoose's outdated `mpromise`.
mongoose.Promise = Promise
mongoose.connect(config.mongoConnStr)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('db connected');
})

const entrySchema = mongoose.Schema({
  createdTs: Date,
  s3Url: String,
})

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.pre('save', function userSavePre(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, (innerErr, hash) => {
      if (innerErr) return next(innerErr)

      // override the cleartext password with the hashed one
      user.password = hash;
      next()
    })
  })
})

userSchema.methods.isValidPassword = function isValidPassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


exports.Entry = mongoose.model('Entry', entrySchema)
exports.User = mongoose.model('User', userSchema)
