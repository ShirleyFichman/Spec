const path = require('path');

const express = require('express');

const generalController = require('../controllers/general');

const router = express.Router();

//all the routes will be added here

router.use('/jobs', generalController.getJobs); // showing the jobs page (but when clicking on submit to job- forward to sign in page)

router.use('/', generalController.getHome); // showing home page with the option to sign / log in 

//MAKE SURE THAT PROFILE ON NAV WONT SHOW ON GENERAL PAGES

module.exports = router;