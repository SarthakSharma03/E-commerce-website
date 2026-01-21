import { useState, useEffect } from 'react'
import iphone17 from '../images/iphone-17.webp'
import iphone16 from '../images/iphone-16.jpeg'
import iphone15 from '../images/iphone-15.webp'
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";


const slides = [
  {
    id: 1,
    title: 'Up to 10% off Voucher',
    subtitle: 'iPhone 14 Series',
    image: iphone17,
    category: 'Electronics'
  },
  {
    id: 2,
    title: 'Big Deals on Electronics',
    subtitle: 'New Arrivals',
    image: iphone16,
     category: 'Men’s Fashion'
  },
  {
    id: 3,
    title: 'Latest Apple Products',
    subtitle: 'Shop Now',
    image: iphone15,
     category: 'HomeandLifestyle'
  },
]

const categories = [
 { id: 1,  title: "Woman’s Fashion"   },
  { id: 2,  title: "Men’s Fashion"     },
  { id: 3,  title: "Electronics"       },
  { id: 4,  title: "Home & Lifestyle"  },
  { id: 5,  title: "Medicine"          },
  { id: 6,  title: "Sports & Outdoor"  },
  { id: 7,  title: "Baby’s & Toys"     },
  { id: 8,  title: "Groceries & Pets"  },
  { id: 9,  title: "Health & Beauty"   }
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
   const [activeCard, setActiveCard] = useState(null);
  const [fade, setFade] = useState(true)
const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length)
        setFade(true)
      }, 500) 
    }, 3000)

    return () => clearInterval(interval)
  }, [])
    const handleClick = (item) => {
    setActiveCard(item.id);
    const categoryParam = encodeURIComponent(item.title);
    navigate(`/explore?category=${categoryParam}`);
  };
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 mb-8">
      <div className="flex flex-col md:flex-row gap-6">
     
        <aside className="hidden md:block w-full md:w-1/4 border-r border-gray-200 pr-4 pt-6">
          <ul className="space-y-3 text-sm font-medium text-black">
            {categories.map((item) => (
              <li
                key={item.id}
                className={`flex cursor-pointer items-center justify-between  transition-colors ${
              activeCard === item.id ? 'hover:text-red-500' : 'hover:text-red-500'
            } `}
               onClick={() => handleClick(item)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </aside>

      
        <div className="relative w-full md:w-3/4 mt-6 overflow-hidden rounded-lg bg-black text-white">
          <div 
            className={`flex flex-col md:flex-row h-75 md:h-87.5 items-center px-6 md:px-12 py-6 transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex-1 text-center md:text-left z-10">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                 <span className="text-4xl"></span>
                 <p className="text-sm font-light">{slides[current].subtitle}</p>
              </div>
              <h1 className="mb-6 text-3xl md:text-5xl font-bold leading-tight">
                {slides[current].title}
              </h1>
            <button
  onClick={() =>
    navigate(`/explore?category=${encodeURIComponent(slides[current].category)}`)
  }
  className="group flex items-center gap-2 text-base font-medium underline cursor-pointer hover:text-gray-300 transition-colors mx-auto md:mx-0 text-white"
>
  Shop Now
  <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
</button>

            </div>

            <div className="flex-1 flex justify-center items-center relative">
              <img 
                src={slides[current].image} 
                alt="Product" 
                className="h-48 md:h-72 object-contain" 
              />
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setFade(false)
                  setTimeout(() => {
                    setCurrent(index)
                    setFade(true)
                  }, 300)
                }}
                className={`h-3 w-3 rounded-full border border-white transition-all ${current === index ? 'bg-red-500 border-red-500' : 'bg-gray-500/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
