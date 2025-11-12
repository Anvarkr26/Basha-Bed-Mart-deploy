import React from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderConfirmationPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();

    return (
        <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
            <div className="bg-white p-12 rounded-lg shadow-xl max-w-2xl mx-auto animate-zoom-in">
                <svg className="w-16 h-16 mx-auto text-secondary transform scale-0 animate-zoom-in" style={{ animationDelay: '200ms'}} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h1 className="text-4xl font-bold text-gray-800 mt-4">Thank You For Your Order!</h1>
                <p className="text-gray-600 mt-4">Your order has been placed successfully. A confirmation email has been sent to you.</p>
                <div className="mt-6 bg-gray-50 p-4 rounded-md">
                    <p className="text-lg font-semibold">Your Order ID is:</p>
                    <p className="text-2xl font-mono text-primary mt-2">{orderId}</p>
                </div>
                <div className="mt-8 space-x-4">
                    <Link to="/products" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300">
                        Continue Shopping
                    </Link>
                    <Link to="/orders" className="bg-primary hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                        View My Orders
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;