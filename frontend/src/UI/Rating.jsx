import { IoMdStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";

const Rating = ({ value = 0, onChange, interactive = false }) => {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (star) => {
    if (!interactive || !onChange) return;
    onChange(star);
  };

  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {stars.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => handleClick(s)}
          className={interactive ? "focus:outline-none cursor-pointer" : "cursor-default"}
        >
          {s <= Math.round(value) ? <IoIosStar /> : <IoMdStarOutline />}
        </button>
      ))}
    </div>
  );
};

export default Rating;
