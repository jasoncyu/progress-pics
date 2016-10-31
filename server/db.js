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

exports.Entry = mongoose.model('Entry', entrySchema)
