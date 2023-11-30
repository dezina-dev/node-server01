const mongoose = require('mongoose'), { Schema, Document } = mongoose;
import { Request, Response } from 'express';
var Order = require('../models/order.model');

const searchOrder = async (req: Request, res: Response) => {
    try {
        const searchquery = req.body.search;

        const result = await Order.find({ $text: { $search: searchquery } })

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

const addCustomerOrder = async (req: Request, res: Response) => {
    try {
        const neworder = new Order(req.body);
        const result = await neworder.save();

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

const ordersForCustomersWithTargetAges = async (req: Request, res: Response) => {
    try {
        const targetAges = req.body.targetAges;
        const result = await Order.aggregate([
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customerId',
                    foreignField: '_id',
                    as: 'customer'
                }
            },
            {
                $unwind: '$customer'
            },
            {
                $match: {
                    'customer.age': { $in: targetAges }
                }
            }
        ]);

        res.status(200).json({
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

module.exports = {
    searchOrder,
    addCustomerOrder,
    ordersForCustomersWithTargetAges
}