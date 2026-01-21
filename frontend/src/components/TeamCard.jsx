import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const TeamCard = ({ image, name, role }) => {
  return (
    <div className="text-center cursor-pointer">
      <img
        src={image}
        alt={name}
        className="mx-auto mb-4 h-48 w-48 rounded-lg object-cover"
      />
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm text-gray-500">{role}</p>
      <div className="mt-2 flex justify-center gap-3 text-gray-400">
        <span><FaInstagram /></span>
        <span><FaXTwitter /></span>
        <span><FaLinkedinIn /></span>
      </div>
    </div>
  );
};

export default TeamCard;
