import express from 'express';
import multer from 'multer';
import Upload from '../models/Upload.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images and videos are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

// Create upload
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    const newUpload = new Upload({
      name,
      description,
      imageUrl: req.files['image'] ? `${baseUrl}/uploads/${req.files['image'][0].filename}` : null,
      videoUrl: req.files['video'] ? `${baseUrl}/uploads/${req.files['video'][0].filename}` : null
    });

    await newUpload.save();
    res.status(201).json(newUpload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all uploads
router.get('/', async (req, res) => {
  try {
    const uploads = await Upload.find().sort({ createdAt: -1 });
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Serve static files
router.use('/uploads', express.static(uploadDir));

export default router;