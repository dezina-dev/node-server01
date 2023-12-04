const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');

router.post('/add-expense', expenseController.addNewExpense);
router.get('/get-expense/:personId', expenseController.getYearlyExpense);
router.post('/expense-date-range', expenseController.expenseWithDateRange);
router.get('/expense-by-category', expenseController.expenseByCategory);
router.put('/update-expense/:expenseId', expenseController.updateExpense);
router.delete('/delete-expense/:expenseId', expenseController.deleteExpense);

export default router;