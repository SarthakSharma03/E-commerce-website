import { createElement } from 'react'
const CategoryCard = ({ title, icon: IconComponent }) => {
  return (
    <div
      className={`md:min-w-60 md:h-55 h-45 min-w-40 border rounded-md flex flex-col items-center justify-center gap-2 cursor-pointer transition 
       `}
    >
      {createElement(IconComponent, { className: 'text-8xl' })}
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
};

export default CategoryCard;
