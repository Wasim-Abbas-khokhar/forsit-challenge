const express = require('express');
const router = express.Router();
const controller = require('../controllers/InventoryController');

/* GET home page. */
router.post('/add', controller.addInventory);
router.put('/update', controller.updateInventory);
router.get('/get', controller.getInventory);

module.exports = router;
