// adminController.js

const Project = require('../models/Project'); // Assuming you have a Project model

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};
