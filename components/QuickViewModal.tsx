import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in"
        onClick={onClose}
    >
        <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-3xl flex flex-col md:flex-row overflow-hidden animate-zoom-in relative"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="md:w-1/2">
                <img src={product.imageUrl} alt={product.name} className="w-full h-64 md:h-full object-cover" />
            </div>
            <div className="md:w-1/2 p-6 flex flex-col">
                <div className="flex-grow">
                    <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
                    <p className="text-2xl font-bold text-primary my-3">₹{product.price.toLocaleString()}</p>
                    <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                     <Link 
                        to={`/products/${product.id}`} 
                        className="w-full text-center bg-secondary hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 active:scale-100 block"
                        onClick={onClose}
                    >
                        View Full Details
                    </Link>
                    <button 
                        onClick={onClose}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-md transition-all duration-300"
                    >
                        Close
                    </button>
                </div>
            </div>
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
                aria-label="Close modal"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
  );
};

export default QuickViewModal;
