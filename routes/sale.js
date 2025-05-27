const express = require('express');
const router = express.Router();
const controller = require('../controllers/saleController.js');

/* GET home page. */
router.post('/add', controller.addSale);
router.put('/update', controller.updateSale);
router.get('/get', controller.getSale);

module.exports = router;
