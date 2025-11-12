import React, { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../components/Carousel';
import ProductCard from '../../components/ProductCard';
import { useAppContext } from '../../hooks/useAppContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const ValueProposition: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-4">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-1 text-gray-600">{description}</p>
    </div>
);

const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = '', style }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(ref, { threshold: 0.1, triggerOnce: true });

    return (
        <section
            ref={ref}
            className={`${className} transition-opacity duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={style}
        >
            {children}
        </section>
    );
};


const HomePage: React.FC = () => {
  const { products, isLoggedIn, currentUser } = useAppContext();
  const featuredProducts = products.filter(p => p.isFeatured);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return uniqueCategories.map(cat => ({
      name: cat,
      imageUrl: products.find(p => p.category === cat)?.imageUrl || 'https://picsum.photos/seed/default/400/300',
    }));
  }, [products]);

  return (
    <div className="animate-fade-in">
      <Carousel />
      <div className="container mx-auto px-4 py-12">
        {isLoggedIn && currentUser && (
          <section className="mb-12 text-center animate-fade-in-down">
            <h2 className="text-3xl font-bold text-gray-800">Welcome back, {currentUser.name}!</h2>
            <p className="text-gray-600 mt-2">Ready to find your perfect sleep solution?</p>
            <div className="mt-4 flex justify-center space-x-4">
                <Link to="/products" className="bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                    Shop All Products
                </Link>
                <Link to="/orders" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-300">
                    View Your Orders
                </Link>
            </div>
          </section>
        )}
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} displayType="featured" index={index} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map(category => (
                    <Link to={`/products?category=${encodeURIComponent(category.name)}`} key={category.name} className="group block">
                        <div className="relative overflow-hidden rounded-lg shadow-lg">
                            <img src={category.imageUrl} alt={category.name} className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16 bg-white rounded-lg shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 text-primary">Why Silk Cotton?</h2>
                <p className="text-gray-800 mb-4 leading-relaxed">
                    At Basha Bed Mart, we specialize in products made from Natural Silk Cotton, known locally as 'Ilavam Panju'. This magical fiber is incredibly soft, lightweight, and hypoallergenic.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-800">
                    <li><strong>Eco-Friendly:</strong> Sustainably harvested from the Kapok tree.</li>
                    <li><strong>Naturally Cool:</strong> Its breathable nature ensures you stay cool all night.</li>
                    <li><strong>Hypoallergenic:</strong> Resistant to pests and decay, perfect for sensitive skin.</li>
                    <li><strong>Unmatched Comfort:</strong> Provides a buoyant, cloud-like sleeping experience.</li>
                </ul>
            </div>
            <div className="md:w-1/2">
                <img src="https://picsum.photos/seed/silkcotton/600/400" alt="Natural Silk Cotton" className="rounded-lg shadow-md w-full h-full object-cover"/>
            </div>
        </AnimatedSection>
        
        <AnimatedSection className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-white p-8 rounded-lg shadow-lg">
                <ValueProposition 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10" /></svg>}
                    title="Free Shipping"
                    description="Enjoy free shipping on all orders across the country."
                />
                 <ValueProposition 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    title="Quality Guaranteed"
                    description="We stand by our handcrafted products with a quality promise."
                />
                 {/* FIX: Replaced incomplete/broken ValueProposition with a complete one, fixing missing props error. */}
                 <ValueProposition 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                    title="Secure Payments"
                    description="Your transactions are safe with our encrypted payment gateway."
                />
            </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

// FIX: Added missing default export for the HomePage component.
export default HomePage;
