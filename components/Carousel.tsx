
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Slide {
  imageUrl: string;
  headline: string;
}

const slides: Slide[] = [
  { imageUrl: 'https://picsum.photos/seed/carousel1/1600/600', headline: 'Discover the Comfort of Natural Silk Cotton' },
  { imageUrl: 'https://picsum.photos/seed/carousel2/1600/600', headline: 'Handcrafted Quality in Every Stitch' },
  { imageUrl: 'https://picsum.photos/seed/carousel3/1600/600', headline: 'Sleep Better, Live Better' },
];

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.imageUrl} alt={slide.headline} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-light p-4">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in-down">{slide.headline}</h2>
              <Link to="/products">
                <button className="bg-primary hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105">
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
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-primary' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
