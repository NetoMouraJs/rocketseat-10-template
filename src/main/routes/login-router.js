const loginController = require('../controllers/login-controller')

module.exports = router => {
  router.get('/user', loginController.show)

  router.post('/user', loginController.store)
}
