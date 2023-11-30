import mongoose, { Schema, Document } from 'mongoose';

const storeSchema = new Schema({
    fruits: {type: [String]},
    vegetables: {type: [String]}
});
module.exports = mongoose.model("Store", storeSchema);