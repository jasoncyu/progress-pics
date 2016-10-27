const express = require('express');

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

module.exports = router
