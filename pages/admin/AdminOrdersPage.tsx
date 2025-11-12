import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Order } from '../../types';

const AdminOrdersPage: React.FC = () => {
    const { orders, users, updateOrderStatus } = useAppContext();
    const [filter, setFilter] = useState<Order['status'] | 'All'>('All');

    const filteredOrders = useMemo(() => {
        if (filter === 'All') return orders;
        return orders.filter(order => order.status === filter);
    }, [orders, filter]);

    const getUserName = (userId: number) => {
        return users.find(u => u.id === userId)?.name || 'Unknown User';
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Orders</h1>
                <div>
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value as any)}
                        className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-sm text-left text-white">
                    <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">Order ID</th>
                            <th scope="col" className="px-6 py-3">Customer</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Total</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3 text-right">Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="px-6 py-4 font-medium">{order.id}</td>
                                <td className="px-6 py-4">{getUserName(order.userId)}</td>
                                <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4">₹{order.total.toLocaleString()}</td>
                                <td className="px-6 py-4">{order.status}</td>
                                <td className="px-6 py-4 text-right">
                                    <select 
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                                        className="bg-gray-700 text-xs p-1 border border-gray-600 rounded"
                                    >
                                        <option>Processing</option>
                                        <option>Shipped</option>
                                        <option>Delivered</option>
                                        <option>Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredOrders.length === 0 && (
                    <p className="text-center py-8 text-gray-400">No orders match the selected filter.</p>
                )}
            </div>
        </div>
    );
};

export default AdminOrdersPage;