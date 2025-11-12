export interface AdminUser {
  id: number;
  username: string;
  password: string;
}

export interface ProductVariant {
  id: number;
  size: string;
  clothMaterial: string;
  weight: number; // in kg
  thickness: number; // in inches
  price: number;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number; // Base price ("Starts at") for the cheapest variant
  imageUrl: string;
  category: string;
  material: string; // main filling material e.g. "Natural Silk Cotton"
  rating: number;
  isFeatured?: boolean;
  variants: ProductVariant[];
}

export interface CartItem {
  productId: number;
  variantId: number;
  name: string;
  imageUrl: string;
  quantity: number;
  variantDescription: string; // e.g., "Queen / Premium Cotton"
  price: number; // The price for the selected variant
}


export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: number;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}


export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  addresses: Address[];
}

export interface LoginCredentials {
    email?: string;
    password?: string;
    admin?: boolean;
}

export interface AuthResponse {
    success: boolean;
    message?: string;
}

export interface AppContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  removeFromCart: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  getCartTotal: () => number;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => AuthResponse;
  logout: () => void;
  signup: (name: string, email: string, password: string) => AuthResponse;
  updateProduct: (updatedProduct: Product) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  removeProduct: (productId: number) => void;
  users: User[];
  addUser: (name: string, email: string, password: string) => AuthResponse;
  removeUser: (userId: number) => void;
  orders: Order[];
  placeOrder: (shippingDetails: any) => string | null;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  currentUser: User | null;
  adminUsers: AdminUser[];
  addAdminUser: (username: string, password: string) => void;
  removeAdminUser: (id: number) => void;
  resetData: () => void;
}