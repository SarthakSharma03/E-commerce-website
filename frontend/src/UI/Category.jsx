import { useRef, useState } from "react";
import { HiOutlineArrowNarrowRight, HiOutlineArrowNarrowLeft } from "react-icons/hi";
import {
  HiOutlineDevicePhoneMobile,
  HiOutlineComputerDesktop,
  HiOutlineCamera,
} from "react-icons/hi2";
import { PiHeadphones } from "react-icons/pi";
import { MdWatch } from "react-icons/md";
import { BsController } from "react-icons/bs";
import CategoryCard from "../components/CategoryCard";
import SectionTitle from "./SectionTitle";

const categories = [
  { id: 1, title: "Phones", icon: HiOutlineDevicePhoneMobile },
  { id: 2, title: "Computers", icon: HiOutlineComputerDesktop },
  { id: 3, title: "SmartWatch", icon: MdWatch },
  { id: 4, title: "Camera", icon: HiOutlineCamera },
  { id: 5, title: "HeadPhones", icon: PiHeadphones },
  { id: 6, title: "Gaming", icon: BsController },
];

const Category = ({ className }) => {
  const sliderRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const handleClick = (id) => {
    setActiveCard(id);
  };

  return (
    <section className={`w-full ${className || ''}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 flex justify-between items-end">
        <SectionTitle eyebrow="Categories" title="Browse By Category" />

        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-gray-100 cursor-pointer"
            aria-label="Scroll Left"
          >
            <HiOutlineArrowNarrowLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-gray-100 cursor-pointer"
            aria-label="Scroll Right"
          >
            <HiOutlineArrowNarrowRight />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-4 scroll-smooth no-scrollbar mx-auto max-w-7xl px-6 py-10 overflow-x-hidden "
      >
        {categories.map((item) => (
          <div
            key={item.id}
            className={`flex-shrink-0 cursor-pointer transition-colors duration-300 rounded-lg ${
              activeCard === item.id ? 'bg-red-500 text-white' : 'bg-white hover:bg-red-500 hover:text-white'
            }`}
            onClick={() => handleClick(item.id)}
          >
            <CategoryCard {...item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;