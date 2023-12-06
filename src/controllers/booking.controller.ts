import { Request, Response } from 'express';
import Booking, { IBooking } from '../models/booking.model';

const bookSeat = async (req: Request, res: Response) => {
  try {
    const { flightId, passengerId, seatNumber } = req.body;
    
    // Check if the seat is available
    const isSeatAvailable = await Booking.findOne({ flight: flightId, seatNumber });
    if (isSeatAvailable) {
      res.status(400).json({ message: 'Seat is already booked' });
      return;
    }

    // Create a new booking
    const newBooking: IBooking = new Booking({ flight: flightId, passenger: passengerId, seatNumber });
    await newBooking.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
    bookSeat
}
