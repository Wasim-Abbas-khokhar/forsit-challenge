const express = require('express');
const router = express.Router();
const controller = require('../controllers/analysisController.js');

/* GET home page. */
router.get('/', controller.analyzeRevenue);
module.exports = router;
