module.exports = {
  store (req, res) {
    return res.json({ msg: 'get-route-login' })
  },

  show (req, res) {
    return res.json({ msg: 'post-route-login' })
  }
}
