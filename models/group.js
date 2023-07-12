const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: String,
  groupId: String,
  source: String,
  emps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"  
    }
  ],
  apps: [
    {
      id: String,
      name: String
    }
  ]
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
