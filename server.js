const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const cors = require('cors');
const multer = require('multer');
const Project = require('./models/Project');

require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({ origin: 'https://yaarchitecte.vercel.app' })); // Use CORS with your frontend origin
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
app.use('/api/projects', projectRoutes); // Ensure this route doesn’t conflict with the POST route above

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
