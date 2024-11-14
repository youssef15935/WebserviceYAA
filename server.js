const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const multer = require('multer');
const Project = require('./models/Project');

require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Allowed origins for both development and production
const allowedOrigins = ['https://yaarchitecte.vercel.app', 'http://localhost:3000', 'https://adminyaa.vercel.app','http://localhost:3001/admin']

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Allow credentials if needed
}));

app.use(express.json());

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files from the "uploads" folder
app.use('/uploads', express.static('uploads'));

// Route to add a project with an image
app.post('/api/projects', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const src = req.file ? `/uploads/${req.file.filename}` : ''; // Save the path to the image

    const newProject = new Project({ title, description, src });
    await newProject.save();
    res.json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du projet' });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
