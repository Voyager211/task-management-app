import Project from '../models/Project.js';
import Task from '../models/Task.js';


export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Project title is required' });
    }

    const project = await Project.create({
      title,
      description,
      owner: req.user._id
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id })
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id
    }).populate('owner', 'name email');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { title, description },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await Task.deleteMany({ project: req.params.id });

    res.json({ 
      message: 'Project and associated tasks deleted successfully',
      deletedProject: project._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
