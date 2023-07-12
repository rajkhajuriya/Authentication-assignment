const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const groupsController = require('../controllers/groupsController');
/*
// API endpoints
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});*/
router.get('/get-all', groupsController.getAllGroups);
router.post('/create', groupsController.createGroup); 

module.exports = router;
