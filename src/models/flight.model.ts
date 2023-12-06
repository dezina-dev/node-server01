import mongoose, { Schema, Document } from 'mongoose';

export interface IFlight extends Document {
  airline: string;
  flightNumber: string;
  departure: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
}

const FlightSchema: Schema = new Schema({
  airline: { type: String, required: true },
  flightNumber: { type: String, required: true },
  departure: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
});

export default mongoose.model<IFlight>('Flight', FlightSchema);