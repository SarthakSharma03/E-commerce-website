const StatCard = ({ icon, value, label, highlight }) => {
  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-lg border p-6 text-center
      ${highlight ? "bg-red-500 text-white" : "bg-white"}`}
    >
      <div className="text-2xl">{icon}</div>
      <h3 className="text-xl font-semibold">{value}</h3>
      <p className="text-sm">{label}</p>
    </div>
  );
};

export default StatCard;
