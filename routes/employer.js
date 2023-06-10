const path = require('path');
const express = require('express');

const employerController = require('../controllers/employer');

const router = express.Router();

router.get('/get-post-job/:employerId', employerController.getPostJob);
router.use('/post-job/:employerId', employerController.postJob); 
router.use('/get-post-employer/:userId', employerController.getPostEmployer);
router.use('/jobs/:employerId', employerController.getJobs); 
router.use('/home/:employerId', employerController.getHome); 

module.exports = router;
