import Task from '../models/Task.js';
import Project from '../models/Project.js';
import mongoose from 'mongoose';


export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, project } = req.body;

    if (!title || !project) {
      return res.status(400).json({ message: 'Title and project are required' });
    }

    const projectExists = await Project.findOne({
      _id: project,
      owner: req.user._id
    });

    if (!projectExists) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      project,
      assignedTo: req.user._id
    });

    await task.populate('project', 'title');
    await task.populate('assignedTo', 'name email');

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getTasks = async (req, res) => {
  try {
    const { project } = req.query;

    const query = { assignedTo: req.user._id };

    if (project) {
      query.project = project;
    }

    const tasks = await Task.find(query)
      .populate('project', 'title')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 }); 
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      assignedTo: req.user._id
    })
      .populate('project', 'title')
      .populate('assignedTo', 'name email');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, assignedTo: req.user._id },
      { title, description, status, priority, dueDate },
      { new: true, runValidators: true }
    )
      .populate('project', 'title')
      .populate('assignedTo', 'name email');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      assignedTo: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ 
      message: 'Task deleted successfully',
      deletedTask: task._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getTaskStats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const statusStats = await Task.aggregate([
      { $match: { assignedTo: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const priorityStats = await Task.aggregate([
      { $match: { assignedTo: userId } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalTasks = await Task.countDocuments({ assignedTo: userId });

    res.json({
      statusStats,
      priorityStats,
      totalTasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
