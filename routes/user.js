const path = require('path');
const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.use('/jobs', userController.getJobs); 
router.use('/profile', userController.getProfile); 
router.use('/:userId', userController.getHome); 

module.exports = router;
