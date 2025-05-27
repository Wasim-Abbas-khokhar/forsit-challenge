const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController.js');

/* GET home page. */
router.post('/add', controller.addProduct);
router.put('/update', controller.updateProduct);
router.get('/get', controller.getProduct);

module.exports = router;
