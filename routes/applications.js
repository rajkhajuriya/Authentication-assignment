const express = require('express');
const router = express.Router();
const Application = require('../models/application');
const applicationsController = require('../controllers/applicationsController');

/*
// Retrieve all applications
router.get('/', async (req, res) => {
  Application.find()
    .then((applications) => {
      res.json(applications);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving applications', error });
    });
});

// Create an application
router.post('/', async (req, res) => {
  const applicationData = req.body;

  Application.create(applicationData)
    .then((application) => {
      res.json(application);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error creating application', error });
    });
});*/
router.get('/', applicationsController.getAllApplications);
router.post('/', applicationsController.createApplication);

module.exports = router;
