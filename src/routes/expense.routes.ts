const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');

router.post('/add-expense', expenseController.addNewExpense);
router.get('/get-yearly-expense/:personId', expenseController.getYearlyExpense);
router.post('/expense-date-range', expenseController.expenseWithDateRange);
router.post('/expense-by-category', expenseController.expenseByCategory);
router.put('/update-expense/:expenseId', expenseController.updateExpense);
router.delete('/delete-expense/:expenseId', expenseController.deleteExpense);
router.get('/get-monthly-expense/:personId', expenseController.getMonthlyExpense);
router.get('/get-average-monthly-expense/:personId', expenseController.getAverageMonthlyExpense);
router.get('/get-latest-expense/:personId', expenseController.getLatestExpenses);
router.get('/highest-expense-person', expenseController.getPersonsWithHighestExpense);
router.get('/filter-expense', expenseController.getFilteredExpenses);

export default router;