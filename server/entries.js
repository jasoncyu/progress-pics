const express = require('express')
const multer = require('multer')
const path = require('path');

const s3client = require('./s3client')

// Handle files from multipar/form-data
// Writing files to /tmp so we can delete them later.
const upload = multer({ dest: '/tmp' })

const router = new express.Router({
  mergeParams: true,
})

router.post('/all', (req, res) => {
  res.send(JSON.stringify({
    id: 1,
    weight: 200,
    pictureUrl: 'asdf.com',
  }, {
    id: 2,
    weight: 197,
    pictureUrl: 'reddit.com',
  }))
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
    s3client.getFileUrl(key)
    res.send('Received!')
  })
})

module.exports = router
