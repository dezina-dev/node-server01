const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passenger.controller');

router.post('/create-passenger', passengerController.createPassenger);

export default router;