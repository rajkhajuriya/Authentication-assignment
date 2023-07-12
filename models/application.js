const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: String,
  source: {
    id: String,
    name: String
  },
  emps: [
    {
      id: String,
      email: String,
      firstname: String,
      username: String,
      lastname: String,
      source: String,
      deleteId: String
    }
  ]
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
