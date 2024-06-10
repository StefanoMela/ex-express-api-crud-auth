const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');

const validator = require('../middlewares/validator');
const { registerData, loginData } = require('../validations/users.js');

router.post('/register', validator(registerData), authController.register)
router.post('/login', validator(loginData), authController.login)

module.exports = router;