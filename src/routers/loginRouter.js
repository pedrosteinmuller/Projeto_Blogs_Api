const express = require('express');
const { loginController } = require('../controllers');
const { validateLogin } = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/', validateLogin, loginController.loginUser);

module.exports = router;