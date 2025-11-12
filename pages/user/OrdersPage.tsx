import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Link } from 'react-router-dom';
import { Order } from '../../types';

const getStatusColor = (status: Order['status']) => {
    switch (status) {
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Processing': return 'bg-yellow-100 text-yellow-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4">
            <div>
                <p className="font-semibold text-lg">Order ID: {order.id}</p>
                <p className="text-sm text-gray-600">Placed on: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <span className={`text-sm font-medium px-3 py-1 rounded-full mt-2 sm:mt-0 ${getStatusColor(order.status)}`}>
                {order.status}
            </span>
        </div>
        <div>
            {order.items.map(item => (
                // FIX: Changed key to use the unique `variantId` from the CartItem type, as `id` and `selectedSize` do not exist.
                <div key={item.variantId} className="flex items-center space-x-4 my-2">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded"/>
                    <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.quantity} x ₹{item.price.toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="text-right font-bold text-lg mt-4 border-t pt-4">
            Total: ₹{order.total.toLocaleString()}
        </div>
    </div>
);

const OrdersPage: React.FC = () => {
    const { orders, currentUser } = useAppContext();

    if (!currentUser) {
        return (
             <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold">Please log in to view your orders.</h1>
                <Link to="/login" className="mt-4 inline-block bg-primary text-white font-bold py-2 px-4 rounded">Login</Link>
            </div>
        )
    }

    const userOrders = orders.filter(o => o.userId === currentUser.id);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">My Orders</h1>
            {userOrders.length > 0 ? (
                <div className="space-y-6">
                    {userOrders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="text-center bg-white p-12 rounded-lg shadow-md">
                    <p className="text-lg text-gray-700">You have not placed any orders yet.</p>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
