const express = require("express");
const router = express.Router();
const Bhajan = require("../models/bhajan");

// GET with search & pagination
router.get("/", async (req, res) => {
  const searchTerm = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const regex = new RegExp(searchTerm, "i");

  try {
    const total = await Bhajan.countDocuments({
      $or: [
        { nameHindi: regex },
        { nameHinglish: regex },
        { singer: regex },
        { houseName: regex }
      ]
    });

    const bhajans = await Bhajan.find({
      $or: [
        { nameHindi: regex },
        { nameHinglish: regex },
        { singer: regex },
        { houseName: regex }
      ]
    })
      .sort({ date: -1 }) // Newest first
      .skip(skip)
      .limit(limit);

    res.json({
      bhajans,
      totalPages: Math.ceil(total / limit),
      page
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST route to save bhajan
router.post("/", async (req, res) => {
  const { houseName, date, nameHindi, nameHinglish, singer } = req.body;

  if (!houseName || !date || !singer || (!nameHindi && !nameHinglish)) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newBhajan = new Bhajan({
      houseName,
      date,
      nameHindi,
      nameHinglish,
      singer
    });

    await newBhajan.save();
    res.status(201).json({ message: "Bhajan saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE bhajan by ID
router.delete("/:id", async (req, res) => {
  try {
    await Bhajan.findByIdAndDelete(req.params.id);
    res.json({ message: "Bhajan deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting bhajan" });
  }
});

// UPDATE bhajan by ID
router.put("/:id", async (req, res) => {
  const { houseName, date, nameHindi, nameHinglish, singer } = req.body;

  try {
    const updatedBhajan = await Bhajan.findByIdAndUpdate(
      req.params.id,
      { houseName, date, nameHindi, nameHinglish, singer },
      { new: true }
    );
    res.json({ message: "Bhajan updated successfully", bhajan: updatedBhajan });
  } catch (err) {
    res.status(500).json({ message: "Error updating bhajan" });
  }
});


module.exports = router;
