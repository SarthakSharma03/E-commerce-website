import { IoMdStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";

const Rating = ({ value = 0 }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {stars.map((s) => (
        <span key={s}>
          {s <= Math.round(value) ? <IoIosStar /> : <IoMdStarOutline />}
        </span>
      ))}
    </div>
  );
};

export default Rating;
