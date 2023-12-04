import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Expense } from "../models/expense.model";
import { Person } from "../models/person.model";

// Create a new expense associated with a person
const addNewExpense = async (req: Request, res: Response) => {
  try {
    const { amount, category, date, personId } = req.body;

    if (!amount || !category || !date || !personId) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const person = await Person.findById(personId);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    const newExpense = new Expense({ amount, category, date, person });
    await newExpense.save();

    return res.status(200).json({
      success: true,
      message: 'New expense added successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getYearlyExpense = async (req: Request, res: Response) => {
  try {
    const { personId } = req.params;

    const result = await Expense.aggregate([
      {
        $match: { person: new mongoose.Types.ObjectId(personId) },
      },
      {
        $group: {
          _id: { year: { $year: '$date' } },
          total: { $sum: '$amount' },
          personId: { $first: '$person' },
        },
      },
      {
        $lookup: {
          from: 'people',
          localField: 'personId',
          foreignField: '_id',
          as: 'personData',
        },
      },
      {
        $unwind: '$personData',
      },
      {
        $project: {
          _id: 1,
          year: '$_id.year',
          total: 1,
          personData: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get expenses within a date range
const expenseWithDateRange = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'start date and end date are required query parameters' });
    }

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    // Validate that the dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: 'Invalid date format in query parameters' });
    }

    // Adjust the end date to include the entire day
    end.setHours(23, 59, 59, 999);

    const expenses = await Expense.aggregate([
      {
        $match: {
          date: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $lookup: {
          from: 'people',
          localField: 'person',
          foreignField: '_id',
          as: 'personData',
        },
      },
      {
        $unwind: '$personData',
      },
    ]);

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get total expenses by category
const expenseByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({ error: 'category is a required' });
    }

    const totalByCategory = await Expense.aggregate([
      {
        $lookup: {
          from: 'people',
          localField: 'person',
          foreignField: '_id',
          as: 'personData',
        },
      },
      {
        $unwind: '$personData',
      },
      {
        $match: { category: category.toString() },
      },
      {
        $project: {
          _id: 1,
          amount: 1,
          category: 1,
          date: 1,
          personData: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: totalByCategory,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an expense
const updateExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params;
    const { amount, category, date } = req.body;

    if (!amount || !category || !date) {
      return res.status(400).json({ error: 'Invalid update data' });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      { amount, category, date },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Updated successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete an expense
const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  addNewExpense,
  getYearlyExpense,
  expenseWithDateRange,
  expenseByCategory,
  updateExpense,
  deleteExpense
}