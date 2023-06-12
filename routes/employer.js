const path = require('path');
const express = require('express');

const employerController = require('../controllers/employer');

const router = express.Router();

router.get('/get-post-job/:employerId', employerController.getPostJob);
router.use('/post-job/:employerId', employerController.postJob); 
router.use('/get-edit-job/:employerId/:jobId', employerController.getEditJob);
router.use('/edit-job/:employerId/:jobId', employerController.editJob);
router.use('/delete-job/:employerId/:jobId', employerController.deleteJob);
router.use('/get-post-employer/:userId', employerController.getPostEmployer);
router.use('/post-employer/:userId', employerController.postEmployer);
router.use('/jobs/:employerId', employerController.getJobs); 
router.use('/company-page/:employerId', employerController.getCompanyPage);
router.use('/home/:employerId', employerController.getHome); 

module.exports = router;
