const Project = require('../models/Project');

// Créer un projet
exports.createProject = async (req, res) => {
  const { title, description, src } = req.body;
  try {
    const newProject = new Project({ title, description, src });
    const project = await newProject.save();
    res.json(project);
  } catch (error) {
    res.status(500).send('Erreur lors de la création du projet');
  }
};

// Obtenir tous les projets
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des projets');
  }
};

// Mettre à jour un projet
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, src } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, src },
      { new: true }
    );
    res.json(updatedProject);
  } catch (error) {
    res.status(500).send('Erreur lors de la mise à jour du projet');
  }
};

// Supprimer un projet
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.json({ msg: 'Projet supprimé' });
  } catch (error) {
    res.status(500).send('Erreur lors de la suppression du projet');
  }
};
