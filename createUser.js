const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/user');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const username = 'msg';                         // 👤 Set your username here
    const plainPassword = 'msg1234';           // 🔑 Your plain password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);  // Hashing

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    console.log('✅ User created with hashed password');
    mongoose.disconnect();
  })
  .catch(err => console.error('❌ MongoDB Error:', err));
