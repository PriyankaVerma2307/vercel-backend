// createUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

(async () => {
  const hash = await bcrypt.hash('msg1234', 10);
  await User.create({ username: 'msgpapa', password: hash });
  console.log('✅ Admin user created');
  mongoose.disconnect();
})();
