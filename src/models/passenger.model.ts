import mongoose, { Schema, Document } from 'mongoose';

export interface IPassenger extends Document {
  name: string;
  age: number;
  gender: string;
}

const PassengerSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
});

export default mongoose.model<IPassenger>('Passenger', PassengerSchema);
