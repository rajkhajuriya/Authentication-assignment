const Application = require('../models/application');

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const createApplication = async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllApplications,
  createApplication,
};
