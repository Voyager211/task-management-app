const StatsCard = ({ title, count, icon, colorClass }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{count}</p>
        </div>
        <div className={`${colorClass} rounded-full p-3`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
