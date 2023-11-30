const mongoose = require('mongoose'), { Schema, Document, UpdateWriteOpResult } = mongoose;
import { Request, Response } from 'express';
var Store = require('../models/store.model');

const addNew = async (req: Request, res: Response) => {
    try {
        const neworder = new Store(req.body);
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

const addItemToStore = async (req: Request, res: Response) => {
    try {
        const updateId = req.params.id;
        const newItem = req.body.fruit

        const result = await Store.updateOne(
            { _id: updateId },
            { $push: { fruits: newItem } }
        );

        return res.status(200).json({
            success: true,
            message: "Items added to store"
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

const removeItemFromStore = async (req: Request, res: Response) => {
    try {
        const updateId = req.params.id;
        const itemToRemove = req.body.vegetable
        const result = await Store.updateOne(
            { _id: updateId },
            { $pull: { vegetables: itemToRemove } }
        );
        return res.status(200).json({
            success: true,
            message: "Items removed from store"
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

const removeItemFromAll = async (req: Request, res: Response) => {
    try {
        const itemsToRemove = req.body.vegetables;

        if (!Array.isArray(itemsToRemove)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request body. "vegetables" should be an array.',
            });
        }

        const result = await Store.updateMany(
            {},
            { $pull: { vegetables: { $in: itemsToRemove } } }
        );

        if (result.modifiedCount > 0) {
            return res.status(200).json({
                success: true,
                message: `Items removed from all stores`,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'No documents found or no modification made',
            });
        }
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

module.exports = {
    addNew,
    removeItemFromStore,
    addItemToStore,
    removeItemFromAll
}