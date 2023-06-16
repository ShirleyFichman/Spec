const path = require('path');
const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.use('/jobs/apply-for-job/:userId/:jobId', userController.postApply); 
router.use('/jobs/:userId', userController.getJobs); 
router.get('/get-edit-profile/:userId', userController.getEditProfile);
router.post('/post-edit-profile/:userId', userController.postEditProfile);
router.use('/profile/:userId', userController.getProfile); 
router.get('/home/:userId', userController.getHome); 

module.exports = router;
