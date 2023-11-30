import mongoose, { Schema, Document } from 'mongoose';

const customerSchema = new Schema({
    customerName: String,
    age: Number,
    place: String,
    income: Number
});
module.exports = mongoose.model("Customer", customerSchema);