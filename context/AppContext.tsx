import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem, AppContextType, User, Order, ProductVariant, AdminUser, LoginCredentials, AuthResponse } from '../types';
import { PRODUCTS, USERS, ORDERS } from '../constants';

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper function to get initial state from localStorage
const getInitialState = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => getInitialState('products', PRODUCTS));
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Authentication State with localStorage persistence
  const [users, setUsers] = useState<User[]>(() => getInitialState('users', USERS));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => getInitialState('isLoggedIn', false));
  const [isAdmin, setIsAdmin] = useState<boolean>(() => getInitialState('isAdmin', false));
  const [currentUser, setCurrentUser] = useState<User | null>(() => getInitialState('currentUser', null));

  const [orders, setOrders] = useState<Order[]>(() => getInitialState('orders', ORDERS));
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    { id: 1, username: 'Anvar', password: 'Anvar@26' }
  ]);
  
  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);
  
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
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
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
    // Also remove user's orders to maintain data integrity
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
    setOrders(prevOrders => 
        prevOrders.map(order => order.id === orderId ? {...order, status} : order)
    );
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

  const resetData = () => {
    // Restore all data to initial state from constants.
    setProducts(PRODUCTS);
    setUsers(USERS);
    setOrders(ORDERS);
    setCart([]);
    logout();
    // Clear persisted state from localStorage
    localStorage.removeItem('products');
    localStorage.removeItem('users');
    localStorage.removeItem('orders');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('currentUser');
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;