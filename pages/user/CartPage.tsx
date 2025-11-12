import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import { CartItem } from '../../types';

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useAppContext();

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.variantDescription}</p>
                    <button onClick={() => removeFromCart(item.variantId)} className="text-sm text-red-500 hover:text-red-700 mt-1">Remove</button>
                </div>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-8">
                 <div className="flex items-center border rounded-md">
                    <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="px-3 py-1">-</button>
                    <span className="px-4">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="px-3 py-1">+</button>
                </div>
                <p className="font-semibold w-24 text-right">₹{(item.price * item.quantity).toLocaleString()}</p>
            </div>
        </div>
    );
};


const CartPage: React.FC = () => {
  const { cart, getCartTotal, isLoggedIn } = useAppContext();
  const subtotal = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-700 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">Your Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md animate-slide-in-left">
            {cart.map(item => (
                <CartItemRow key={item.variantId} item={item} />
            ))}
        </div>
        <aside className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md self-start animate-slide-in-right">
            <h2 className="text-2xl font-semibold border-b pb-4 mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                </div>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-4">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
            </div>
            {isLoggedIn ? (
                <Link to="/checkout" className="block text-center w-full mt-6 bg-secondary hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-300">
                    Proceed to Checkout
                </Link>
            ) : (
                <Link to="/login" className="block text-center w-full mt-6 bg-primary hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300">
                    Login to Continue
                </Link>
            )}

        </aside>
      </div>
    </div>
  );
};

export default CartPage;