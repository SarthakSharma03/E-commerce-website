import { useState } from "react";
import { IoMdStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";

const Rating = ({ value = 0, onChange, interactive = false }) => {
  const [hover, setHover] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (star) => {
    if (!interactive || !onChange) return;
    onChange(star);
  };

  return (
    <div className="flex items-center gap-1 text-yellow-500 text-2xl">
      {stars.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => handleClick(s)}
          onMouseEnter={() => interactive && setHover(s)}
          onMouseLeave={() => interactive && setHover(0)}
          className={interactive ? "focus:outline-none cursor-pointer transition-transform hover:scale-110" : "cursor-default"}
        >
          {s <= (hover || Math.round(value)) ? <IoIosStar /> : <IoMdStarOutline />}
        </button>
      ))}
    </div>
  );
};

export default Rating;
