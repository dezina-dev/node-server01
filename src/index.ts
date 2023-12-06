const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require("dotenv").config();

import customerRouter from './routes/customer.routes';
import orderRouter from './routes/order.routes';
import storeRouter from './routes/store.routes';
import passengerRouter from './routes/passenger.routes';
import flightRouter from './routes/flight.routes';
import bookingRouter from './routes/booking.routes';

var app = express();

const PORT = Number(process.env.PORT || 4000);
console.log("PORT", PORT)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//allow OPTIONS on all resources
app.options('*', cors())
app.use(cors());

app.use('/customer', customerRouter);
app.use('/order', orderRouter);
app.use('/store', storeRouter);
app.use('/passenger', passengerRouter);
app.use('/flight', flightRouter);
app.use('/booking', bookingRouter);

mongoose.connect(process.env.DB, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  // useFindAndModify: false,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err:any) => {
  console.error('MongoDB connection error:', err);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app;