const path = require('path');
const express = require('express');

const generalController = require('../controllers/general');

const router = express.Router();

router.use('/home/:userId', generalController.getHome); 
router.use('/', generalController.getAuth); 

module.exports = router;