import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  // Fetch project and tasks
  useEffect(() => {
    fetchProjectData();
  }, [id]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const [projectRes, tasksRes] = await Promise.all([
        API.get(`/projects/${id}`),
        API.get(`/tasks?project=${id}`)
      ]);
      setProject(projectRes.data);
      setTasks(tasksRes.data);
    } catch (error) {
      console.error('Error fetching project:', error);
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  // Create new task using TaskForm
  const handleCreateTask = async (taskData) => {
    const { data } = await API.post('/tasks', {
      ...taskData,
      project: id
    });
    setTasks([data, ...tasks]);
    setShowModal(false);
  };

  // Update task status
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const { data } = await API.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map(task => task._id === taskId ? data : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Delete project
  const handleDeleteProject = async () => {
    if (!window.confirm('Are you sure? This will delete the project and all its tasks.')) {
      return;
    }

    try {
      await API.delete(`/projects/${id}`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  // Group tasks by status
  const tasksByStatus = {
    'Todo': tasks.filter(t => t.status === 'Todo'),
    'In Progress': tasks.filter(t => t.status === 'In Progress'),
    'Done': tasks.filter(t => t.status === 'Done')
  };

  // Priority colors
  const priorityColors = {
    'Low': 'bg-green-100 text-green-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'High': 'bg-red-100 text-red-800'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-12">
          <p className="text-gray-600">Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-indigo-600 hover:text-indigo-800 mb-4 flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </button>
              <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
              <p className="text-gray-600 mt-2">{project.description || 'No description'}</p>
              <p className="text-sm text-gray-500 mt-2">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                + New Task
              </button>
              <button
                onClick={handleDeleteProject}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>

        {/* Task Board - Grouped by Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Todo Column */}
          <div className="bg-white rounded-lg shadow">
            <div className="bg-yellow-50 px-4 py-3 border-b border-yellow-200">
              <h2 className="font-bold text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                Todo ({tasksByStatus['Todo'].length})
              </h2>
            </div>
            <div className="p-4 space-y-3 min-h-[200px]">
              {tasksByStatus['Todo'].map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteTask}
                  priorityColors={priorityColors}
                />
              ))}
              {tasksByStatus['Todo'].length === 0 && (
                <p className="text-gray-400 text-center py-8 text-sm">No tasks</p>
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-white rounded-lg shadow">
            <div className="bg-purple-50 px-4 py-3 border-b border-purple-200">
              <h2 className="font-bold text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                In Progress ({tasksByStatus['In Progress'].length})
              </h2>
            </div>
            <div className="p-4 space-y-3 min-h-[200px]">
              {tasksByStatus['In Progress'].map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteTask}
                  priorityColors={priorityColors}
                />
              ))}
              {tasksByStatus['In Progress'].length === 0 && (
                <p className="text-gray-400 text-center py-8 text-sm">No tasks</p>
              )}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-white rounded-lg shadow">
            <div className="bg-green-50 px-4 py-3 border-b border-green-200">
              <h2 className="font-bold text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Done ({tasksByStatus['Done'].length})
              </h2>
            </div>
            <div className="p-4 space-y-3 min-h-[200px]">
              {tasksByStatus['Done'].map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteTask}
                  priorityColors={priorityColors}
                />
              ))}
              {tasksByStatus['Done'].length === 0 && (
                <p className="text-gray-400 text-center py-8 text-sm">No tasks</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Task</h3>
            <TaskForm
              onSubmit={handleCreateTask}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
