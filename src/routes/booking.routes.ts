const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

router.post('/book-seat', bookingController.bookSeat)

export default router;