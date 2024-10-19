import React from 'react';

const HeroFigure = () => {
  return (
    <div className="relative w-[528px] h-[396px]">
      <svg className="absolute inset-0" width="528" height="396" viewBox="0 0 528 396">
        <rect width="528" height="396" className="fill-transparent" />
      </svg>
      <div className="absolute inset-0 origin-center rotate-45 scale-100 opacity-100 transition-all duration-500 ease-in-out" ></div>
      <div className="absolute inset-0 origin-center -rotate-45 scale-100 opacity-100 transition-all duration-500 ease-in-out" ></div>
      <div className="absolute inset-0 origin-center rotate-0 scale-100 opacity-100 transition-all duration-500 ease-in-out"></div>
      <div className="absolute inset-0 origin-center -rotate-135 scale-100 opacity-100 transition-all duration-500 ease-in-out" ></div>
      <div className="absolute inset-0 transform scale-100 perspective-500 -rotate-y-15 rotate-x-8 -rotate-z-1 transition-all duration-500 ease-in-out"></div>
      <div className="absolute inset-0 transform scale-100 perspective-500 rotate-z-20 transition-all duration-500 ease-in-out"></div>
      <div className="absolute inset-0 transform scale-100 perspective-500 rotate-z-20 transition-all duration-500 ease-in-out"></div>
      <div className="absolute inset-0 origin-center -rotate-22 scale-100 opacity-100 transition-all duration-500 ease-in-out" ></div>
      <div className="absolute inset-0 origin-center -rotate-52 scale-100 opacity-100 transition-all duration-500 ease-in-out" ></div>
      <div className="absolute inset-0 origin-center -rotate-50 scale-100 opacity-100 transition-all duration-500 ease-in-out" ></div>
    </div>
  );
};

export default HeroFigure;