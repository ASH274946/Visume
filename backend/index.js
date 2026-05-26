require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Visume Backend is running!' });
});

// Example route for user data
app.get('/api/user', (req, res) => {
  res.json({ message: 'User data endpoint' });
});

const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Ensure upload directories exist
const uploadDirs = ['uploads', 'uploads/videos', 'uploads/resumes'];
uploadDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith('video/')) {
      cb(null, 'uploads/videos/');
    } else {
      cb(null, 'uploads/resumes/');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// API Endpoint to handle file uploads
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  
  // Return the local file path
  const localUrl = `/uploads/${req.file.destination.split('uploads/')[1]}${req.file.filename}`;
  res.json({ 
    message: 'File uploaded successfully locally',
    localUrl: localUrl
  });
});

app.delete('/api/delete', (req, res) => {
  const { fileUrl } = req.body;
  if (!fileUrl) {
    return res.status(400).json({ error: 'No file URL provided.' });
  }

  // Ensure it's an uploads URL and prevent path traversal
  if (fileUrl.startsWith('/uploads/') && !fileUrl.includes('..')) {
    const filePath = path.join(__dirname, fileUrl);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        return res.json({ message: 'File deleted locally' });
      } catch (err) {
        return res.status(500).json({ error: 'Failed to delete file' });
      }
    } else {
      return res.status(404).json({ error: 'File not found' });
    }
  }
  res.status(400).json({ error: 'Invalid file URL' });
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
