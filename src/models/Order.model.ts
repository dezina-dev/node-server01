import mongoose, { Schema, Document } from 'mongoose';

const orderSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  orderFor: String,
  quantity: Number,
  amount: Number,
  orderDate: {
    type: Date,
    default: Date.now()
  }
});

// Create a text index on the orderFor field
orderSchema.index({ orderFor: 'text' });

module.exports = mongoose.model('Order', orderSchema);
