import { Request, Response } from 'express';
import { Person } from "../models/person.model";

// add person
const addPerson = async (req: Request, res: Response) => {
  try {

    const { name, age } = req.body;
    const newPerson = new Person(req.body);
    const result = await newPerson.save();

    res.status(200).json({
      success: true,
      message: 'New person added successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all people
const getAllPeople = async (req: Request, res: Response) => {
  try {
    const result = await Person.find();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  addPerson,
  getAllPeople
}