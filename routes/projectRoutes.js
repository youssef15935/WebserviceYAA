const express = require('express');
const router = express.Router();
const { createProject, getProjects, updateProject, deleteProject } = require('../controllers/projectController');
const Project = require('../models/Project');
// Routes CRUD
router.post('/', createProject);           // Créer un projet
router.get('/', getProjects);              // Obtenir tous les projets
router.put('/:id', updateProject);         // Mettre à jour un projet
router.delete('/:id', deleteProject);      // Supprimer un projet

// Route pour obtenir un projet par ID
router.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
