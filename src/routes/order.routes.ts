const express = require('express');
const router  = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/search-orders', orderController.searchOrder);
router.post('/create-order', orderController.addCustomerOrder);
router.post('/order-targetAges', orderController.ordersForCustomersWithTargetAges);

export default router;