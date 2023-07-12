const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

/*
// API endpoints
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});*/

router.get('/get-all', employeesController.getAllEmployees);
router.post('/create', employeesController.createEmployee);

module.exports = router;
