import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowRight, HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { HiOutlineCamera , HiComputerDesktop  } from "react-icons/hi2";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { BsSmartwatch } from "react-icons/bs";
import { TiCamera } from "react-icons/ti";
import { FaHeadphones } from "react-icons/fa6";
import { GiConsoleController } from "react-icons/gi";
import { FaShoppingBag, FaTshirt } from "react-icons/fa";
import { MdOutlineSportsSoccer, MdChair, MdMedicalServices, MdChildCare, MdPets, MdHealthAndSafety } from "react-icons/md";
import CategoryCard from "../components/CategoryCard";
import SectionTitle from "./SectionTitle";

 const categories = [
  { id: 1, title: "Woman’s Fashion", icon: FaShoppingBag },
  { id: 2, title: "Men’s Fashion", icon: FaTshirt },
  { id: 3, title: "Electronics", icon: HiOutlineCamera },
  { id: 4, title: "Home & Lifestyle", icon: MdChair },
  { id: 5, title: "Medicine", icon: MdMedicalServices },
  { id: 6, title: "Sports & Outdoor", icon: MdOutlineSportsSoccer },
  { id: 7, title: "Baby’s & Toys", icon: MdChildCare },
  { id: 8, title: "Groceries & Pets", icon: MdPets },
  { id: 9, title: "computer", icon:  HiComputerDesktop  },
  { id: 10, title: "phone", icon: IoPhonePortraitOutline },
  { id: 11, title: "smartWatch", icon: BsSmartwatch },
  { id: 12, title: "Camera", icon: TiCamera },
  { id: 13, title: "Headphone", icon: FaHeadphones },
  { id: 14, title: "Gaming", icon: GiConsoleController },

];

const Category = ({ className }) => {
  const sliderRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const handleClick = (item) => {
    setActiveCard(item.id);
    const categoryParam = encodeURIComponent(item.title);
    navigate(`/explore?category=${categoryParam}`);
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
            onClick={() => handleClick(item)}
          >
            <CategoryCard {...item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
