const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const request = require('../requests/user_request');

router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.post('/', request.userStore, UserController.store);
router.put('/:id', request.userUpdate, UserController.update);
router.delete('/:id', UserController.delete)

module.exports = router;
