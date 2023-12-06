import mongoose, { Schema, Document } from 'mongoose';
import { IFlight } from '../models/flight.model';
import { IPassenger } from '../models/passenger.model';

export interface IBooking extends Document {
  flight: IFlight['_id'];
  passenger: IPassenger['_id'];
  seatNumber: string;
}

const BookingSchema: Schema = new Schema({
  flight: { type: Schema.Types.ObjectId, ref: 'Flight', required: true },
  passenger: { type: Schema.Types.ObjectId, ref: 'Passenger', required: true },
  seatNumber: { type: String, required: true },
});

export default mongoose.model<IBooking>('Booking', BookingSchema);
