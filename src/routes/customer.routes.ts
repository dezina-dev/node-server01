const express = require('express');
const router  = express.Router();
const customerController = require('../controllers/customer.controller');

router.post('/add-customer', customerController.addCustomer);
router.get('/older-than/:age', customerController.getCustomerOlderThan);
router.get('/get-all-customers', customerController.getAllCustomers);
router.put('/update-customer/:id', customerController.updateCustomer);
router.delete('/delete-customer/:id', customerController.deleteCustomer);
router.get('/customer-maxOrderAmount', customerController.customerMaxOrderAmount);
router.get('/customer-minOrderAmount', customerController.customerMinOrderAmount);
router.post('/customer-andQuery', customerController.andQuery);
router.post('/customer-orQuery', customerController.orQuery);
router.post('/customer-targetPlaces', customerController.customersWithTargetPlaces);

export default router;