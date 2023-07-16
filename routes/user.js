const path = require('path');
const express = require('express');
const multer = require('multer');

const userController = require('../controllers/user');

const upload = multer({ dest: 'uploads/' }); 

const router = express.Router();

router.use('/jobs/apply-for-job/:userId/:jobId', userController.postApply); 
router.use('/jobs/:userId', userController.getJobs); 
router.get('/get-edit-profile/:userId', userController.getEditProfile);
router.post('/post-edit-profile/:userId', userController.postEditProfile);
router.post('/profile/upload-resume/:userId', upload.single('resume'), userController.postResume); 
router.use('/profile/:userId', userController.getProfile); 
router.get('/employer-page/:userId/:employerId', userController.getEmployerPage);
router.get('/home/:userId', userController.getHome); 

module.exports = router;
