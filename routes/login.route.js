var router = require('express').Router()
var loginController = require('../controllers/login.controller')

router.get('/', loginController.index)
router.get('/welcome', loginController.welcome)
router.get('/logout', loginController.logout)
router.post('/', loginController.loginPost)

module.exports = router