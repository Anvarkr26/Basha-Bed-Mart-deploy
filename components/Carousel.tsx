
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

const Carousel: React.FC = () => {
  const { carouselSlides: slides } = useAppContext();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  if (slides.length === 0) {
    return (
      <div className="relative w-full h-64 md:h-96 overflow-hidden bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No carousel images have been configured.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.imageUrl} alt={slide.headline} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-light p-4">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in-down">{slide.headline}</h2>
              <Link to="/products">
                <button className="bg-primary hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-100">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 transform hover:scale-125 ${index === currentSlide ? 'bg-primary' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;