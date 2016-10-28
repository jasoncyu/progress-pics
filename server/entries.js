const express = require('express')
const multer = require('multer')
const path = require('path');

const s3client = require('./s3client')
const db = require('./db')

// Handle files from multipar/form-data
// Writing files to /tmp so we can delete them later.
const upload = multer({ dest: '/tmp' })

const router = new express.Router({
  mergeParams: true,
})

router.post('/all', (req, res) => {
  db.Entry.find({}).exec(
    (err, entries) => {
      if (err) console.error(err)
      res.send(JSON.stringify({
        entries,
      }))
    })
})

/**
 * Create an entry
 */
router.post('/', upload.single('progressPicture'), (req, res) => {
  // TODO: Validate that file is an image
  const imageFile = req.file
  const fileExtension = path.parse(imageFile.originalname).ext
  const fileNameForS3 = `${imageFile.filename}${fileExtension}`
  s3client.uploadFile(imageFile, fileNameForS3)
  .then((key) => {
    const url = s3client.getFileUrl(key)
    new db.Entry({
      s3Url: url,
    }).save((err, entry) => {
      console.log(entry)
      res.send('Received!')
    })
  })
})

module.exports = router
