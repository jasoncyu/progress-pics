const express = require('express')
const multer = require('multer')
const path = require('path');

const s3client = require('./s3client')
const db = require('./db')

const ensureAuthenticated = require('./common').ensureAuthenticated

// Handle files from multipar/form-data
// Writing files to /tmp so we can delete them later.
const upload = multer({ dest: '/tmp' })

const router = new express.Router({
  mergeParams: true,
})


router.get('/:entryId.json', (req, res, next) => {
  db.Entry.findOne({ _id: req.params.entryId })
    .then((entry) => {
      res.send(JSON.stringify({
        entry,
      }))
      return entry
    })
    .catch(next)
})

router.post('/all', ensureAuthenticated, (req, res, next) => {
  db.User.findOne({ _id: req.user._id })
    .then((user) => {
      return user.getEntries()
    })
    .then((entries) => {
      res.send(JSON.stringify({
        entries,
      }))
      return entries
    })
    .catch(next)
    // .catch((err) => {
    //   throw err
    // })
})

/**
 * Create an entry
 */
router.post('/', upload.single('progressPicture'), ensureAuthenticated, (req, res) => {
  // TODO: Validate that file is an image
  const imageFile = req.file
  const fileExtension = path.parse(imageFile.originalname).ext
  const fileNameForS3 = `${imageFile.filename}${fileExtension}`
  s3client.uploadFile(imageFile, fileNameForS3)
  .then((key) => {
    const url = s3client.getFileUrl(key)
    new db.Entry({
      createdTs: new Date(),
      s3Url: url,
      userId: req.user._id,
    }).save((err, entry) => {
      res.send(JSON.stringify(entry))
    })
  })
})

router.use((err, req, res, next) => {
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
      err,
    })
  /* res.status(500).send(JSON.stringify(err, null, 2))*/
})

module.exports = router
