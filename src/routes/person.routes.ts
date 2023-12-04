const express = require('express');
const router = express.Router();
const personContrpller = require('../controllers/person.controller');

router.post('/add-person', personContrpller.addPerson);
router.get('/get-people', personContrpller.getAllPeople);

export default router;