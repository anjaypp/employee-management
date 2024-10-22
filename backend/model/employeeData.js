const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  EmployeeId: {
    type: Number,
    required: true
  },
  EmployeeName: {
    type: String,
    required: true
  },
  EmployeeDesignation: {
    type: String,
    required: true
  },
  EmployeeLocation: {
    type: String,
    required: true
  },
  Salary: {
    type: Number,
    required: true
  },
  Department: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
