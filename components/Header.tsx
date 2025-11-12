import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CartIcon: React.FC = () => {
    const { cart } = useAppContext();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
                 <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                </span>
            )}
        </div>
    );
};

const UserMenu: React.FC = () => {
    const { currentUser, logout } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
                <span className="font-medium text-gray-800 hover:text-primary">{currentUser?.name}</span>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>My Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>My Orders</Link>
                    <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
            )}
        </div>
    );
};


const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `py-2 text-gray-800 hover:text-primary transition-colors duration-300 ${isActive ? 'text-primary font-semibold' : ''}`;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };


  return (
    <header className="bg-light shadow-md sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
               <img src="https://picsum.photos/seed/logo/40/40" alt="Basha Bed Mart Logo" className="h-10 w-10 rounded-full" />
              <Link to="/" className="text-xl md:text-2xl font-bold text-dark whitespace-nowrap">
                Basha Bed Mart
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <NavLink to="/" className={navLinkClasses}>Home</NavLink>
              <NavLink to="/products" className={navLinkClasses}>Products</NavLink>
              <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
              <NavLink to="/location" className={navLinkClasses}>Location</NavLink>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-full py-2 px-4 w-40 md:w-56 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 text-black bg-white placeholder-black" 
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </form>

            <Link to="/cart" className="text-gray-800 hover:text-primary relative transition-colors">
                <CartIcon />
            </Link>
            
            <div className="hidden md:flex items-center">
                {isLoggedIn ? (
                    <UserMenu />
                ) : (
                    <Link to="/login" className="text-gray-800 hover:text-primary transition-colors duration-300">Login</Link>
                )}
            </div>

            <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 hover:text-primary">
                    {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
            <nav className="flex flex-col space-y-2 border-t pt-2 pb-4">
                <NavLink to="/" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                <NavLink to="/products" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Products</NavLink>
                <NavLink to="/contact" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
                <NavLink to="/location" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Location</NavLink>
                <div className="border-t pt-2 mt-2">
                    {isLoggedIn ? (
                        <>
                           <NavLink to="/profile" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>My Profile</NavLink>
                           <NavLink to="/orders" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>My Orders</NavLink>
                           <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full text-left py-2 text-gray-800 hover:text-primary transition-colors duration-300">Logout</button>
                        </>
                    ) : (
                        <NavLink to="/login" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>Login</NavLink>
                    )}
                </div>
            </nav>
        </div>

      </div>
    </header>
  );
};

export default Header;