const path = require('path');
const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.use('/jobs', userController.getJobs); 
router.get('/get-edit-profile/:userId', userController.getEditProfile);
router.post('/post-edit-profile/:userId', userController.postEditProfile);
router.use('/profile/:userId', userController.getProfile); 
router.get('/home/:userId', userController.getHome); 

module.exports = router;
