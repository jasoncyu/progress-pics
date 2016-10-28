const express = require('express')
const multer = require('multer')

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
  s3client.uploadFile(imageFile)
  .then(() => {
    res.send('Received!')
  })
})

module.exports = router
