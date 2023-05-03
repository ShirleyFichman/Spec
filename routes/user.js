const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

//all the routes will be added here

router.use('/', userController.getExample);

module.exports = router;