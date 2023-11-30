const mongoose = require('mongoose'), { Schema, Document } = mongoose;
import { Request, Response } from 'express';
var Customer = require("../models/customer.model");
var Order = require('../models/order.model');

const addCustomer = async (req: Request, res: Response) => {
  try {
    const newrecord = new Customer(req.body);
    const result = await newrecord.save();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getCustomerOlderThan = async (req: Request, res: Response) => {
  try {
    const age = parseInt(req.params.age);

    let result = await Customer.find({ "age": { $gt: age } })

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const result = await Customer.aggregate([
      {
        $lookup: {
          from: 'orders', // The name of the collection to join
          localField: '_id', // The field from the input documents (customers)
          foreignField: 'customerId', // The field from the documents of the "from" collection (orders)
          as: 'orders', // The name for the output array
        },
      },
      {
        $project: {
          _id: 1,
          customerName: 1,
          age: 1,
          orders: {
            orderFor: 1,
            quantity: 1,
            amount: 1,
            orderDate: 1
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateCustomer = async (req: Request, res: Response) => {

  try {
    const customerId = req.params.id;
    const updateCustomerData = {
      customerName: req.body.customerName,
      age: req.body.age,
      place: req.body.place,
      income: req.body.income
    }
    const updateOrderData = {
      orderFor: req.body.orderFor,
      quantity: req.body.quantity,
      amount: req.body.amount
    }

    // Update the customer in the Customer collection
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, updateCustomerData, { new: true });

    // Update the corresponding orders in the Order collection
    const updatedOrder = await Order.updateOne({ customerId: new mongoose.Types.ObjectId(customerId) }, { $set: updateOrderData });

    res.status(200).json({
      success: true,
      message: "Customer updated successfully"
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      error: error,
    });
  }
}

const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.id;

    // Delete the customer in the Customer collection
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);

    // Delete the corresponding orders in the Order collection
    const deletedOrders = await Order.deleteMany({ customerId: new mongoose.Types.ObjectId(customerId) });

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully"
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

const customerMaxOrderAmount = async (req: Request, res: Response) => {
  try {
    const customersWithMaxOrder: Document[] = await Order.aggregate([
      {
        $group: {
          _id: '$customerId',
          maxAmount: { $max: '$amount' }
        }
      },
      {
        $sort: {
          maxAmount: -1  // Sort in descending order based on maxAmount
        }
      },
      {
        $limit: 1
      },
      {
        $lookup: {
          from: 'customers',
          localField: '_id',
          foreignField: '_id',
          as: 'customer'
        }
      },
      {
        $project: {
          _id: 0,
          customerId: '$_id',
          customerName: '$customer.customerName',
          maxAmount: '$maxAmount'
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      customerWithMaxOrder: customersWithMaxOrder[0]
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
}

const customerMinOrderAmount = async (req: Request, res: Response) => {
  try {
    // Get customers with the maximum order amount
    const customersWithMaxOrder: Document[] = await Order.aggregate([
      {
        $group: {
          _id: '$customerId',
          maxAmount: { $min: '$amount' }
        }
      },
      {
        $sort: {
          maxAmount: 1  // Sort in descending order based on maxAmount
        }
      },
      {
        $limit: 1  // Get only the customer with the highest order amount
      },
      {
        $lookup: {
          from: 'customers',
          localField: '_id',
          foreignField: '_id',
          as: 'customer'
        }
      },
      {
        $project: {
          _id: 0,
          customerId: '$_id',
          customerName: '$customer.customerName',
          maxAmount: '$maxAmount'
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      customerWithMaxOrder: customersWithMaxOrder[0]
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
}

// API for $and query
const andQuery = async (req: Request, res: Response) => {
  try {
    const { belowAge, aboveAge, income } = req.body;

    const result = await Customer.find({
      $and: [
        { $or: [{ age: { $lt: belowAge } }, { age: { $gt: aboveAge } }] },
        { income: { $lte: income } }
      ]
    })

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

// API for $or query
const orQuery = async (req: Request, res: Response) => {
  try {
    const { age, place, income } = req.body;

    const result = await Customer.find({
      $or: [
        { age: age },
        { place: place },
        { income: income }
      ]
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const customersWithTargetPlaces = async (req: Request, res: Response) => {
  try {
    const targetPlaces = req.body.targetPlaces;
    const result = await Customer.find({
      place: { $in: targetPlaces }
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    })
  }
}

module.exports = {
  addCustomer,
  getCustomerOlderThan,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  customerMaxOrderAmount,
  customerMinOrderAmount,
  andQuery,
  orQuery,
  customersWithTargetPlaces
}