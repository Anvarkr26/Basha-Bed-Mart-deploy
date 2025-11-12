import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
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

const AdminUserDataPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { users, orders } = useAppContext();

    const user = users.find(u => u.id === Number(id));
    const userOrders = orders.filter(o => o.userId === Number(id));

    if (!user) {
        return (
            <div>
                <h1 className="text-2xl font-bold">User not found</h1>
                <Link to="/admin/users" className="text-blue-400 hover:underline mt-4 inline-block">Back to Users List</Link>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => navigate(-1)} className="text-sm text-blue-400 hover:underline mb-4">
                &larr; Back to Users
            </button>
            <h1 className="text-3xl font-bold mb-2">User Details: {user.name}</h1>
            <p className="text-gray-200 mb-6">{user.email}</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Shipping Addresses</h2>
                        {user.addresses.map(addr => (
                            <div key={addr.id} className="text-sm p-2 border-b border-gray-700 last:border-b-0">
                                <p>{addr.street}, {addr.city}</p>
                                <p>{addr.state} - {addr.zip}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order History */}
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Order History ({userOrders.length})</h2>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {userOrders.length > 0 ? userOrders.map(order => (
                             <div key={order.id} className="bg-gray-700/50 p-4 rounded-md">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{order.id}</p>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-200 mt-1">{new Date(order.date).toLocaleDateString()} - ₹{order.total.toLocaleString()}</p>
                             </div>
                        )) : <p className="text-gray-200">This user has not placed any orders.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserDataPage;