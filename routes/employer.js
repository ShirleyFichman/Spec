const path = require('path');

const express = require('express');

const employerController = require('../controllers/employer');

const router = express.Router();

router.use('/', employerController.getHome); // needs to be forwarded to the home page with that user signed in

module.exports = router;