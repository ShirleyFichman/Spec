const path = require('path');
const express = require('express');

const employerController = require('../controllers/employer');

const router = express.Router();

router.use('/', employerController.getHome); 

module.exports = router;