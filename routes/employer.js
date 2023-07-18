const path = require('path');
const express = require('express');

const employerController = require('../controllers/employer');

const router = express.Router();

router.get('/get-post-job/:employerId', employerController.getPostJob);
router.post('/edit-company/:employerId', employerController.editCompany);
router.use('/post-job/:employerId', employerController.postJob); 
router.get('/get-edit-job/:employerId/:jobId', employerController.getEditJob);
router.post('/edit-job/:employerId/:jobId', employerController.editJob);
router.use('/delete-job/:employerId/:jobId', employerController.deleteJob);
router.get('/get-edit-company-page/:employerId', employerController.getEditCompany);
router.get('/get-post-employer/:userId', employerController.getPostEmployer);
router.use('/post-employer/:userId', employerController.postEmployer);
router.use('/jobs/:employerId', employerController.getJobs); 
router.use('/company-page/:employerId', employerController.getCompanyPage);
router.use('/home/:employerId', employerController.getHome); 

module.exports = router;
