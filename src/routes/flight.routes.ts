const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flight.controller');

router.get('/get-avail-seats', flightController.getAvailableSeats);
router.post('/create-flight', flightController.createFlight);

export default router;