//TODO add success from google auth here

const path = require('path');
const express = require('express');

const generalController = require('../controllers/general');

const router = express.Router();

router.use('/jobs', generalController.getJobs); 
router.use('/', generalController.getAuth); 

module.exports = router;
