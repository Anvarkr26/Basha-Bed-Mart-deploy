import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import ProductCard from '../../components/ProductCard';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { products } = useAppContext();
  const query = searchParams.get('q');

  const filteredProducts = query
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      {query ? (
        <>
          <h1 className="text-3xl font-bold mb-2">Search Results for "{query}"</h1>
          <p className="text-gray-600 mb-8">{filteredProducts.length} results found.</p>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg">No products found for your search.</p>
              <Link to="/products" className="mt-4 inline-block bg-primary hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                View All Products
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold">Please enter a search term.</h1>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
