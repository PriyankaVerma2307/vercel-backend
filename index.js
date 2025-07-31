const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bhajanRouter = require('./routes/bhajanRouter');
const dotenv = require("dotenv");

const app = express();
const PORT = 5000;

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch(err => {
  console.error("❌ Mongo error:", err);
});

app.use(cors());
app.use(express.json());

app.use("/api/bhajans", bhajanRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
