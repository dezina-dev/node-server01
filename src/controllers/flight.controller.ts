import { Request, Response } from 'express';
import Flight, { IFlight } from '../models/flight.model';
import Booking, { IBooking } from '../models/booking.model';

const getAvailableSeats = async (req: Request, res: Response) => {
  try {
    const flightId = req.params.flightId;
    const bookedSeats = await Booking.find({ flight: flightId }).distinct('seatNumber');
    const allSeats = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const availableSeats = allSeats.filter(seat => !bookedSeats.includes(seat));
    res.status(200).json({
      success: true,
      data: availableSeats
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const createFlight = async (req: Request, res: Response) => {
  try {
    const { airline, flightNumber, departure, destination, departureTime, arrivalTime } = req.body;

    const newFlight: IFlight = new Flight({
      airline,
      flightNumber,
      departure,
      destination,
      departureTime,
      arrivalTime,
    });
    await newFlight.save();

    res.status(201).json(newFlight);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
    getAvailableSeats,
    createFlight
}