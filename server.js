const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const cors = require('cors');
const multer = require('multer');
const Project = require('./models/Project'); // Assurez-vous que le modèle Project est importé correctement
const { login } = require('./controllers/authController');
const { getProjects } = require('./controllers/adminController');
const authenticate = require('./middleware/authenticate');
require('dotenv').config();
const router = express.Router();
const app = express(); // Déclarez app ici



// Connexion à la base de données
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Configuration de multer pour l'upload de fichiers
const upload = multer({ dest: 'uploads/' });

// Rendre le dossier 'uploads' accessible publiquement
app.use('/uploads', express.static('uploads'));


// Route pour ajouter un projet avec image
app.post('/api/projects', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const src = req.file ? `/uploads/${req.file.filename}` : ''; // Enregistrer le chemin de l'image

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
router.post('/login', login);
router.get('/projects', authenticate, getProjects);
app.use(cors({ origin: 'https://yaarchitecte.vercel.app' }));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
