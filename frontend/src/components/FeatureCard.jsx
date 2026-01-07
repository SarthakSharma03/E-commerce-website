const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
        {icon}
      </div>
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default FeatureCard;
