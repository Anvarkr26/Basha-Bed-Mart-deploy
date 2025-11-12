import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import { ProductVariant } from '../../types';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.512 1.924 6.344l-1.667 6.125 6.25-1.648zm11.362-8.244c-.373-.185-2.22-.093-2.562-.053-.342.04-.582.092-.823.332-.24.24-.913.911-1.112 1.111-.199.199-.398.223-.737.048-.34-.176-1.425-.525-2.712-1.671-1.002-.88-1.681-1.96-1.889-2.301-.207-.34-.01-1.002.166-1.345.152-.303.34-.504.51-.699.17-.196.223-.333.333-.561.11-.227.053-.42-.04-.561-.092-.14-.823-.972-1.111-1.317-.288-.345-.576-.303-.823-.303h-.622c-.24 0-.58.092-.823.332-.24.24-.913.911-1.112 1.111-.199.199-.398.447-.398.972s.913 2.111 1.032 2.259c.119.149 1.838 2.823 4.473 3.946 1.001.452 1.408.487 2.111.452.703-.035 1.587-.639 1.838-1.251.25-.612.25-1.136.166-1.251-.082-.116-.28-.185-.652-.37z" />
  </svg>
);

const SmsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
  </svg>
);


// Helper component for rendering a group of option buttons
const OptionSelector: React.FC<{
  label: string;
  options: (string | number)[];
  selectedValue: string | number;
  onSelect: (value: string | number) => void;
  availableOptions: Set<string | number>;
  unit?: string;
}> = ({ label, options, selectedValue, onSelect, availableOptions, unit = '' }) => (
    <div>
        <label className="block text-sm font-medium text-gray-800 mb-2 font-semibold">{label}</label>
        <div className="flex flex-wrap gap-2">
            {options.map(option => {
                const isAvailable = availableOptions.has(option);
                // FIX: Corrected typo from `constisSelected` to `const isSelected`.
                const isSelected = selectedValue === option;
                return (
                    <button
                        key={option}
                        onClick={() => onSelect(option)}
                        disabled={!isAvailable}
                        className={`px-4 py-2 border rounded-md transition-all duration-200 text-sm font-medium ${
                        isSelected
                            ? 'bg-primary text-white border-primary ring-2 ring-primary/50'
                            : 'bg-white text-gray-700 border-gray-300'
                        } ${isAvailable ? 'hover:bg-gray-100 cursor-pointer' : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-70'}`}
                        aria-pressed={isSelected}
                    >
                        {option} {unit}
                    </button>
                )
            })}
        </div>
    </div>
);


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useAppContext();
  const product = products.find(p => p.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState('');

  const [selectedOptions, setSelectedOptions] = useState({
    size: '',
    clothMaterial: '',
    weight: 0,
    thickness: 0,
  });

  // Initialize selectedOptions with the first variant when the product loads
  useEffect(() => {
    if (product?.variants?.length) {
      const firstVariant = product.variants[0];
      setSelectedOptions({
        size: firstVariant.size,
        clothMaterial: firstVariant.clothMaterial,
        weight: firstVariant.weight,
        thickness: firstVariant.thickness,
      });
    }
  }, [product]);

  // Memoize unique options for the entire product
  const uniqueProductOptions = useMemo(() => {
    if (!product) return { sizes: [], clothMaterials: [], weights: [], thicknesses: [] };
    return {
      sizes: [...new Set(product.variants.map(v => v.size))],
      clothMaterials: [...new Set(product.variants.map(v => v.clothMaterial))],
      weights: [...new Set(product.variants.map(v => v.weight))].sort((a,b) => a-b),
      thicknesses: [...new Set(product.variants.map(v => v.thickness))].sort((a,b) => a-b),
    };
  }, [product]);

  // Memoize available options based on current selections
  const { availableOptions, currentVariant } = useMemo(() => {
    if (!product) return { availableOptions: {}, currentVariant: null };
    
    const availableSizes = new Set(product.variants.map(v => v.size));
    
    const variantsAfterSize = product.variants.filter(v => v.size === selectedOptions.size);
    const availableClothMaterials = new Set(variantsAfterSize.map(v => v.clothMaterial));
    
    const variantsAfterCloth = variantsAfterSize.filter(v => v.clothMaterial === selectedOptions.clothMaterial);
    const availableWeights = new Set(variantsAfterCloth.map(v => v.weight));
    
    const variantsAfterWeight = variantsAfterCloth.filter(v => v.weight === selectedOptions.weight);
    const availableThicknesses = new Set(variantsAfterWeight.map(v => v.thickness));

    const finalVariant = product.variants.find(v => 
        v.size === selectedOptions.size &&
        v.clothMaterial === selectedOptions.clothMaterial &&
        v.weight === selectedOptions.weight &&
        v.thickness === selectedOptions.thickness
    );

    return {
      availableOptions: { availableSizes, availableClothMaterials, availableWeights, availableThicknesses },
      currentVariant: finalVariant || null,
    };
  }, [product, selectedOptions]);

  const handleOptionSelect = (optionType: keyof typeof selectedOptions, value: string | number) => {
    const newOptions = { ...selectedOptions, [optionType]: value };

    // Cascade selection reset
    if (optionType === 'size') {
      const possibleVariants = product!.variants.filter(v => v.size === value);
      newOptions.clothMaterial = possibleVariants[0].clothMaterial;
      newOptions.weight = possibleVariants[0].weight;
      newOptions.thickness = possibleVariants[0].thickness;
    } else if (optionType === 'clothMaterial') {
      const possibleVariants = product!.variants.filter(v => v.size === newOptions.size && v.clothMaterial === value);
      newOptions.weight = possibleVariants[0].weight;
      newOptions.thickness = possibleVariants[0].thickness;
    } else if (optionType === 'weight') {
      const possibleVariants = product!.variants.filter(v => v.size === newOptions.size && v.clothMaterial === newOptions.clothMaterial && v.weight === value);
      newOptions.thickness = possibleVariants[0].thickness;
    }
    
    setSelectedOptions(newOptions);
  };
  
  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }
  
  const handleAddToCart = () => {
    if (currentVariant) {
        addToCart(product, currentVariant, quantity);
        setNotification(`${product.name} (${currentVariant.size}) has been added to your cart!`);
        setTimeout(() => setNotification(''), 3000);
    }
  };

  const productUrl = window.location.href;
  const shareText = `Check out this amazing product: ${product.name}!\n\n${product.shortDescription}\n\nFind it here: ${productUrl}`;
  const encodedShareText = encodeURIComponent(shareText);
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedShareText}`;
  const smsShareUrl = `sms:?&body=${encodedShareText}`;


  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {notification && (
        <div className="fixed top-24 right-4 bg-secondary text-white py-3 px-5 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-fade-in-down">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{notification}</span>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2 animate-slide-in-left">
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
        <div className="lg:w-1/2 animate-slide-in-right">
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-xl">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
            <span className="text-gray-700 ml-2">{product.rating} / 5</span>
          </div>
          <p className="text-3xl font-bold text-primary mb-6">₹{currentVariant?.price.toLocaleString() || 'N/A'}</p>
          <p className="text-gray-800 mb-6 leading-relaxed">{product.description}</p>
          
          <div className="space-y-4 mb-8 border-t pt-6">
              <OptionSelector label="Size" options={uniqueProductOptions.sizes} selectedValue={selectedOptions.size} onSelect={(v) => handleOptionSelect('size', v)} availableOptions={availableOptions.availableSizes!} />
              <OptionSelector label="Cloth Material" options={uniqueProductOptions.clothMaterials} selectedValue={selectedOptions.clothMaterial} onSelect={(v) => handleOptionSelect('clothMaterial', v)} availableOptions={availableOptions.availableClothMaterials!} />
              <OptionSelector label="Weight" options={uniqueProductOptions.weights} selectedValue={selectedOptions.weight} onSelect={(v) => handleOptionSelect('weight', v)} availableOptions={availableOptions.availableWeights!} unit="kg" />
              <OptionSelector label="Thickness" options={uniqueProductOptions.thicknesses} selectedValue={selectedOptions.thickness} onSelect={(v) => handleOptionSelect('thickness', v)} availableOptions={availableOptions.availableThicknesses!} unit="inches" />
          </div>
          
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center border rounded-md">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-lg font-semibold">-</button>
              <span className="px-4 py-2 text-lg">{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(currentVariant?.stock || 1, q + 1))} className="px-4 py-2 text-lg font-semibold">+</button>
            </div>
            <p className="text-sm text-gray-600">{currentVariant ? (currentVariant.stock > 0 ? `${currentVariant.stock} in stock` : 'Out of stock') : 'Select options'}</p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!currentVariant || currentVariant.stock === 0}
            className="w-full max-w-xs flex items-center justify-center gap-2 bg-secondary hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span>{currentVariant && currentVariant.stock > 0 ? 'Add to Cart' : 'Unavailable'}</span>
          </button>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Share this product</h3>
            <div className="flex items-center space-x-3">
              <a 
                href={whatsappShareUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-md hover:bg-[#128C7E] transition-colors duration-300"
                aria-label="Share on WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
              <a 
                href={smsShareUrl} 
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                aria-label="Share via SMS"
              >
                <SmsIcon className="w-5 h-5" />
                <span>SMS</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;