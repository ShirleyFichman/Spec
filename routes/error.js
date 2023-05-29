const path = require('path');
const express = require('express');

const errorController = require('../controllers/error');

const router = express.Router();

router.use('/error', errorController.getLoginError);
router.use('/', errorController.get404); 

module.exports = router;
