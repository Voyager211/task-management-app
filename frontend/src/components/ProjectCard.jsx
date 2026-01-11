import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/projects/${project._id}`)}
      className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {project.title}
      </h3>
      <p className="text-gray-600 text-sm line-clamp-2">
        {project.description || 'No description'}
      </p>
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {new Date(project.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default ProjectCard;
