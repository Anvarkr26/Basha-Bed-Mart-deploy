import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem, AppContextType, User, Order, ProductVariant, AdminUser, LoginCredentials, AuthResponse, SiteSettings, CarouselSlide } from '../types';
import { PRODUCTS, USERS, ORDERS, CAROUSEL_SLIDES } from '../constants';

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'basha-bed-mart-data';

// --- LocalStorage Helper Functions ---

// Data structure for the stored state
interface AppState {
    products: Product[];
    users: User[];
    orders: Order[];
    siteSettings: SiteSettings;
    carouselSlides: CarouselSlide[];
}

const loadStateFromLocalStorage = (): AppState => {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (serializedState === null) {
            // No state in localStorage, return initial state from constants
            return {
                products: PRODUCTS,
                users: USERS,
                orders: ORDERS,
                carouselSlides: CAROUSEL_SLIDES,
                siteSettings: {
                    logoUrl: 'https://picsum.photos/seed/logo/40/40',
                    faviconUrl: 'https://picsum.photos/seed/favicon/32/32',
                    upiId: 'rakk1426521@okaxis'
                }
            };
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Could not load state from local storage. Using default state.", e);
        // Fallback to initial state if there's an error
        return { products: PRODUCTS, users: USERS, orders: ORDERS, carouselSlides: CAROUSEL_SLIDES, siteSettings: { logoUrl: '', faviconUrl: '', upiId: '' } };
    }
};

// Helper to get session state from localStorage (for non-synced data)
const getSessionState = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // --- Data State (Synced with localStorage) ---
    const [products, setProducts] = useState<Product[]>(() => loadStateFromLocalStorage().products);
    const [users, setUsers] = useState<User[]>(() => loadStateFromLocalStorage().users);
    const [orders, setOrders] = useState<Order[]>(() => loadStateFromLocalStorage().orders);
    const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => loadStateFromLocalStorage().siteSettings);
    const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>(() => loadStateFromLocalStorage().carouselSlides);

    // --- Session State (Local to device, not synced in main object) ---
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => getSessionState('isLoggedIn', false));
    const [isAdmin, setIsAdmin] = useState<boolean>(() => getSessionState('isAdmin', false));
    const [currentUser, setCurrentUser] = useState<User | null>(() => getSessionState('currentUser', null));
    const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
        { id: 1, username: 'Anvar', password: 'Anvar@26' }
    ]);

    // --- Core Data Sync to localStorage ---
    useEffect(() => {
        const stateToSave: AppState = { products, users, orders, siteSettings, carouselSlides };
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
        } catch (e) {
            console.error("Failed to save state to local storage:", e);
        }
    }, [products, users, orders, siteSettings, carouselSlides]);

    // Persist session state to localStorage
    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [isLoggedIn, isAdmin, currentUser]);


  const addToCart = (product: Product, variant: ProductVariant, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.variantId === variant.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.variantId === variant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const newCartItem: CartItem = {
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        imageUrl: product.imageUrl,
        quantity,
        variantDescription: `${variant.size} / ${variant.clothMaterial}`,
        price: variant.price,
      };
      return [...prevCart, newCartItem];
    });
  };

  const removeFromCart = (variantId: number) => {
    setCart(prevCart => prevCart.filter(item => item.variantId !== variantId));
  };

  const updateQuantity = (variantId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.variantId === variantId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const signup = (name: string, email: string, password: string): AuthResponse => {
    const userExists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      return { success: false, message: "An account with this email already exists." };
    }
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password, // In a real app, you must hash this password!
      addresses: [],
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    // Log in the new user immediately
    setIsLoggedIn(true);
    setIsAdmin(false);
    setCurrentUser(newUser);
    return { success: true };
  };

  const login = (credentials: LoginCredentials): AuthResponse => {
    // Admin Login
    if (credentials.admin) {
        setIsLoggedIn(true);
        setIsAdmin(true);
        setCurrentUser(null);
        return { success: true };
    }

    // User Login
    const { email, password } = credentials;
    if (!email || !password) {
        return { success: false, message: "Email and password are required." };
    }
    const foundUser = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
    if (foundUser) {
        setIsLoggedIn(true);
        setIsAdmin(false);
        setCurrentUser(foundUser);
        return { success: true };
    }
    
    return { success: false, message: "Invalid email or password." };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentUser(null);
    // Session state is cleared via useEffect
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      id: Date.now(),
      ...productData,
    };
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  const removeProduct = (productId: number) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };

  const addUser = (name: string, email: string, password: string): AuthResponse => {
    const userExists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      return { success: false, message: "A user with this email already exists." };
    }
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password, // In a real app, you must hash this password!
      addresses: [],
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    return { success: true };
  };

  const removeUser = (userId: number) => {
    // Also remove user's orders for data consistency
    setOrders(prevOrders => prevOrders.filter(order => order.userId !== userId));
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };


  const placeOrder = (shippingDetails: any) => {
    if (cart.length === 0 || !currentUser) return null;
    const newOrder: Order = {
        id: `ORD-${Date.now()}`,
        userId: currentUser.id,
        date: new Date().toISOString().split('T')[0],
        items: [...cart],
        total: getCartTotal(),
        status: 'Processing',
        shippingAddress: shippingDetails,
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setCart([]);
    return newOrder.id;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders => prevOrders.map(order => order.id === orderId ? {...order, status} : order));
  };

  const addAdminUser = (username: string, password: string) => {
    setAdminUsers(prevAdmins => {
      const newAdmin: AdminUser = {
        id: Date.now(),
        username,
        password,
      };
      return [...prevAdmins, newAdmin];
    });
  };

  const removeAdminUser = (id: number) => {
    if (adminUsers.length <= 1) {
      alert("You cannot remove the last admin user.");
      return;
    }
    setAdminUsers(prevAdmins => prevAdmins.filter(admin => admin.id !== id));
  };
  
  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
  };

  const addCarouselSlide = (slide: Omit<CarouselSlide, 'id'>) => {
    const newSlide: CarouselSlide = {
      id: Date.now(),
      ...slide,
    };
    setCarouselSlides(prevSlides => [...prevSlides, newSlide]);
  };

  const updateCarouselSlide = (updatedSlide: CarouselSlide) => {
    setCarouselSlides(prevSlides => prevSlides.map(slide => (slide.id === updatedSlide.id ? updatedSlide : slide)));
  };

  const removeCarouselSlide = (slideId: number) => {
    setCarouselSlides(prevSlides => prevSlides.filter(slide => slide.id !== slideId));
  };

  const resetData = () => {
     if (window.confirm('Are you sure you want to reset all application data (products, users, orders)? This action cannot be undone.')) {
        setProducts(PRODUCTS);
        setUsers(USERS);
        setOrders(ORDERS);
        setCarouselSlides(CAROUSEL_SLIDES);
        setSiteSettings({
            logoUrl: 'https://picsum.photos/seed/logo/40/40',
            faviconUrl: 'https://picsum.photos/seed/favicon/32/32',
            upiId: 'rakk1426521@okaxis'
        });
        setCart([]);
        logout();
        alert('Application data has been reset successfully.');
    }
  };

  const value = {
    products,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    isLoggedIn,
    isAdmin,
    login,
    logout,
    signup,
    updateProduct,
    addProduct,
    removeProduct,
    users,
    addUser,
    removeUser,
    orders,
    placeOrder,
    updateOrderStatus,
    currentUser,
    adminUsers,
    addAdminUser,
    removeAdminUser,
    resetData,
    siteSettings,
    updateSiteSettings,
    carouselSlides,
    addCarouselSlide,
    updateCarouselSlide,
    removeCarouselSlide,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;