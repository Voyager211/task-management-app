import express from 'express';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getTaskStats
} from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/stats', getTaskStats); 

// /api/tasks
router.route('/')
  .get(getTasks) 
  .post(createTask); 

// /api/tasks/:id
router.route('/:id')
  .get(getTask) 
  .put(updateTask)   
  .delete(deleteTask);

export default router;
