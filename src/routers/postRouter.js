const express = require('express');
const { postController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');
const { validatePost } = require('../middlewares/validatePost');
const { validateUpdate } = require('../middlewares/validateUpdate');

const router = express.Router();

router.post('/', validateToken, validatePost, postController.create);
router.get('/', validateToken, postController.getAll);
router.get('/:id', validateToken, postController.getPostsById);
router.put('/:id', validateToken, validateUpdate, postController.updatePostById);

module.exports = router;