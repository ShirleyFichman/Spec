const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

//all the routes will be added here

router.use('/jobs', userController.getJobs); // needs to be forwarded to the jobs page with that user signed in

router.use('/profile', userController.getProfile); // needs to be forwarded to the user's profile

router.use('/', userController.getHome); // needs to be forwarded to the home page with that user signed in

module.exports = router;