const express = require('express');
const router = express.Router();
const { createProject, getProjects, updateProject, deleteProject } = require('../controllers/projectController');
const Project = require('../models/Project');

// CRUD Routes
router.post('/', createProject);           // Create a project
router.get('/', getProjects);              // Get all projects
router.put('/:id', updateProject);         // Update a project by ID
router.delete('/:id', deleteProject);      // Delete a project by ID

// Route to get a single project by ID
router.get('/:id', async (req, res) => { // Fixed route path
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
