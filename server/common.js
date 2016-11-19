/**
 * Verify that the user is authenticated before allowing them to proceed.
 *
 * @throws 400 if user is not signed in.
 */
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.setHeader('Content-Type', 'application/json')
    res.status(400).send(JSON.stringify({
      message: 'Please log in to do that.',
    }))
  }
}

module.exports = {
  ensureAuthenticated,
}
