import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, index = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1, triggerOnce: true });

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 group flex flex-col ${isVisible ? 'animate-zoom-in' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <Link to={`/products/${product.id}`} className="block flex-grow">
        <div className="relative">
          <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
          
          <p className="text-sm text-gray-500 mt-1 h-10 overflow-hidden">{product.shortDescription}</p>
          
          <div className="mt-auto pt-4 flex justify-between items-center">
            <span className="text-xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
             <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="text-gray-600 ml-1">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
          <button 
            onClick={() => onQuickView(product)}
            className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-3 rounded-md transition-all duration-300 text-sm active:scale-95"
          >
            Quick View
          </button>
          <Link to={`/products/${product.id}`} className="w-full text-center bg-secondary hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-md transition-all duration-300 transform hover:scale-105 active:scale-100 block text-sm">
            View Details
          </Link>
      </div>
    </div>
  );
};

export default ProductCard;