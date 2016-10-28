'use strict'
// Need use strict to enable classes
const s3 = require('s3')

const config = require('./config')
const ExtendableError = require('es6-error');

class S3Error extends ExtendableError {
  constructor(message) {
    super(message)
  }
}

// Couple things worth testing
// TODO: Test what happens if file size is greater than
// `multipartUploadThreshold`
const client = s3.createClient({
  s3Options: {
    // AWS Auth
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,

    // Max upload size in bytes
    multipartUploadThreshold: 20 * 1024 * 1024,
  },
})

const uploadFile = (imageFile) => {
  const uploader = client.uploadFile({
    localFile: imageFile.path,
    s3Params: {
      Bucket: config.aws.bucket,
      Key: config.aws.accessKeyId,
    },
  })

  return new Promise((resolve, reject) => {
    uploader.on('error', (err) => {
      reject(new S3Error('Upload failed', err.stack))
    })
    // Could turn this on if we need logging
    // uploader.on('progress', () => {
    //   console.log('Upload in progress...')
    //   console.log('progress', `${uploader.progressAmount}/${uploader.progressTotal}`);
    // })
    uploader.on('end', () => {
      resolve()
    })
  })
}

module.exports = {
  uploadFile,
}
