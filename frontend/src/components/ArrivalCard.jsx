const ArrivalCard = ({ image, title, description, large }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-black text-white group
      ${large ? "h-full" : "h-55"}`}
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
      />

      <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end">
        <h3 className="text-xl font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-gray-200 mt-1">{description}</p>
        )}
        <button className="mt-3 w-fit text-sm underline cursor-pointer  ">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ArrivalCard;
