const mongoose = require('mongoose')

const config = require('./config')

// Use bluebird promises over Mongoose's outdated `mpromise`.
mongoose.Promise = require('bluebird')
mongoose.connect(config.mongoConnStr)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('db connected');
})

const entrySchema = mongoose.Schema({
  createdTs: {
    type: Date,
    required: true,
  },
  s3Url: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
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

/**
 * Check whether the password is correct for this user.
 */
userSchema.methods.isValidPassword = function isValidPassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

/**
 * Get the entries belonging to this user.
 */
userSchema.methods.getEntries = function getEntries() {
  return this.model('Entry').find({ userId: this._id })
}


exports.Entry = mongoose.model('Entry', entrySchema)
exports.User = mongoose.model('User', userSchema)
