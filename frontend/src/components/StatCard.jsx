const StatCard = ({ icon, value, label }) => {
  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-lg border p-6 text-center bg-white hover:bg-red-500 hover:text-white cursor-pointer  duration-500 ease-out-in     
      `}
    >
      <div className="text-2xl">{icon}</div>
      <h3 className="text-xl font-semibold">{value}</h3>
      <p className="text-sm">{label}</p>
    </div>
  );
};

export default StatCard;
