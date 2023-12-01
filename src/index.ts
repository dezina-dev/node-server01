const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require("dotenv").config();

import customerRouter from './routes/customer.routes';
import orderRouter from './routes/order.routes';
import storeRouter from './routes/store.routes';
import userRouter from './routes/user.routes';
import postRouter from './routes/posts.routes';

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
app.use('/user', userRouter);
app.use('/posts', postRouter);

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