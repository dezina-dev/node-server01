import { Request, Response } from 'express';
import PassengerModel, { IPassenger } from '../models/passenger.model';

const createPassenger = async (req: Request, res: Response) => {
  try {
    const { name, age, gender } = req.body;
    
    const newPassenger: IPassenger = new PassengerModel(req.body);
    const result = await newPassenger.save();

    res.status(200).json({
      success: true,
      data: result,
      message: 'New passenger added'
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
    createPassenger
}