import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import Dish from "../models/Dishes.js";

const Adminroute = express.Router();

// Admin Middleware
const checkAdmin = (req, res, next) => {
  const adminKey = req.headers["x-admin-key"];
  if (adminKey === process.env.ADMIN_KEY) {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};

// Use absolute path for uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Create Dish
Adminroute.post("/create", checkAdmin, upload.single("dishPhoto"), async (req, res) => {
  console.log("Received body:", req.body);
  console.log("Received file:", req.file);

  try {
    const name = (req.body.name || "").trim();
    const description = (req.body.description || "").trim();
    const type = (req.body.type || "").trim();
    const price = req.body.price || null;
    const dishPhoto = req.file?.filename || "";

    if (!name || !description || !type) {
      return res.status(400).json({
        message: "Validation failed",
        error: "Name, description, and type are required fields"
      });
    }

    const newDish = new Dish({ name, description, type, price, dishPhoto });
    await newDish.save();

    return res.status(201).json(newDish);
  } catch (err) {
    return res.status(409).json({
      message: "Failed to create dish",
      error: err.message
    });
  }
});

// Fetch Dishes
Adminroute.get("/dishes", async (req, res) => {
  console.log("/api/admin/dishes route HIT");
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Update Dish
Adminroute.put("/dish/:id", checkAdmin, upload.single("dishPhoto"), async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ error: "Dish not found" });

    // Delete old image if replaced
    if (req.file && dish.dishPhoto) {
      const oldImagePath = path.join(uploadDir, dish.dishPhoto);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Failed to delete old image:", err);
      });
    }

    const updatedData = {
      name: req.body.name || dish.name,
      description: req.body.description || dish.description,
      type: req.body.type || dish.type,
      price: req.body.price || dish.price,
      dishPhoto: req.file ? req.file.filename : dish.dishPhoto,
    };

    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedDish);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Dish
Adminroute.delete("/dish/:id", checkAdmin, async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) return res.status(404).json({ error: "Dish not found" });

    if (dish.dishPhoto) {
      const imagePath = path.join(uploadDir, dish.dishPhoto);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    res.json({ message: "Dish deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default Adminroute;
