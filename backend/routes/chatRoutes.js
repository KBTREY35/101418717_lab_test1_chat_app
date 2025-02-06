const express = require('express');
const GroupMessage = require('../models/GroupMessage');
const PrivateMessage = require('../models/PrivateMessage');
const router = express.Router();

router.post('/group', async (req, res) => {
  try {
    const message = new GroupMessage(req.body);
    await message.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/private', async (req, res) => {
  try {
    const message = new PrivateMessage(req.body);
    await message.save();
    res.status(201).json({ message: 'Private message sent successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
