const express = require('express');
const router = express.Router();
const employeeRoutes = require('../model/employeeData');


// GET Operation - Display Employees
router.get('/employee', async (req, res) => {
  try {
    // Fetch employees from the database
    const employees = await employeeRoutes.find();
    res.json(employees);
  } catch (err) { 
    res.status(500).send("Internal Server Error");
  }
});


// POST: Add a new employee
router.post('/add', async (req, res) => {
  try {
    const employee = new employeeRoutes(req.body);
    await employee.save();
    res.redirect('/employee');
  } catch (error) {
    res.status(500).json({message:error.message});
  }
});

// PUT: Update an employee
router.put('/update/:id', async (req, res) => {
  try {
    const employee = await employeeRoutes.findByIdAndUpdate(
    req.params.id,
     req.body,
     { new: true }
      );
    if(!employee) return res.status(404).json({message:"Employee not found"})
    res.json(employee)
  } catch (error) {
    res.status(500).json({message:error.message});
  }
});

// DELETE: Remove an employee
router.delete('/delete/:id', async (req, res) => {
  try {
    const employee = await employeeRoutes.findByIdAndDelete(req.params.id);
    if(!employee) return res.status(404).json({message:"Employee not found"});
    res.json({message:"Employee Deleted!"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
