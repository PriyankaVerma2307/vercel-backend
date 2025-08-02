// routes/createAdmin.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/createAdmin', async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: 'msgpapa' });
    if (existingUser) {
      return res.status(200).json({ message: 'User already exists' });
    }

    const hash = await bcrypt.hash('msg1234', 10);
    await User.create({ username: 'msgpapa', password: hash });

    return res.status(201).json({ message: '✅ Admin user created successfully' });
  } catch (err) {
    return res.status(500).json({ message: '❌ Error creating admin', error: err.message });
  }
});

module.exports = router;
