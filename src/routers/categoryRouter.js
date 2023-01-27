const express = require('express');
const { categoryController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateToken, categoryController.createCategory);
router.get('/', validateToken, categoryController.getAllCategories);

module.exports = router;