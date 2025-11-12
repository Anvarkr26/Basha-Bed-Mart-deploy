import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { useAppContext } from '../../hooks/useAppContext';
import { Product } from '../../types';

const ProductsPage: React.FC = () => {
  const { products } = useAppContext();
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const [filters, setFilters] = useState({
    category: categoryFromUrl || 'All',
    material: 'All',
    price: 50000,
  });
  const [sortBy, setSortBy] = useState('newest');

  // If the URL param changes, update the filter state
  useEffect(() => {
    setFilters(prev => ({ ...prev, category: categoryFromUrl || 'All' }));
  }, [categoryFromUrl]);


  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const materials = ['All', ...Array.from(new Set(products.map(p => p.material)))];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };
  
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
        return (filters.category === 'All' || product.category === filters.category) &&
               (filters.material === 'All' || product.material === filters.material) &&
               (product.price <= filters.price);
    });

    return filtered.sort((a: Product, b: Product) => {
        switch (sortBy) {
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'rating': return b.rating - a.rating;
            default: return b.id - a.id; // newest
        }
    });
  }, [products, filters, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-8 animate-fade-in-down">Our Products</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="md:w-1/4 bg-white p-6 rounded-lg shadow-md self-start animate-slide-in-left">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-800">Category</label>
              <select id="category" name="category" value={filters.category} onChange={handleFilterChange} className="mt-1 block w-full bg-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="material" className="block text-sm font-medium text-gray-800">Material</label>
              <select id="material" name="material" value={filters.material} onChange={handleFilterChange} className="mt-1 block w-full bg-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                {materials.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-800">Max Price: ₹{filters.price.toLocaleString()}</label>
              <input type="range" id="price" name="price" min="0" max="50000" step="100" value={filters.price} onChange={handleFilterChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"/>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="md:w-3/4 animate-slide-in-right">
           <div className="flex justify-end mb-4">
               <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="block bg-white pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                </select>
           </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <p className="text-gray-600 text-lg">No products match your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;