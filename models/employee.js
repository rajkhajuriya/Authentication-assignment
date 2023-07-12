const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  id: String,
  email: String,
  firstname: String,
  lastname: String,
  username: String,
  source: String,
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  apps: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Application" } ,
    }
  ]
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
