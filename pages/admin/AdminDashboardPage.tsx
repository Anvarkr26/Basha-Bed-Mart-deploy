import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Link } from 'react-router-dom';
import { Order } from '../../types';

const SalesIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const OrdersIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const PendingIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const DeliveredIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-gray-800 p-6 rounded-lg flex items-center space-x-4">
        <div className="bg-red-500 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-gray-200">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const getStatusColor = (status: Order['status']) => {
    switch (status) {
        case 'Delivered': return 'text-green-400';
        case 'Shipped': return 'text-blue-400';
        case 'Processing': return 'text-yellow-400';
        case 'Cancelled': return 'text-red-400';
        default: return 'text-gray-400';
    }
};

const AdminDashboardPage: React.FC = () => {
    const { orders, products, users } = useAppContext();

    // 1. Calculate Stats
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Processing').length;
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

    // 2. Get Recent Orders
    const recentOrders = [...orders].sort((a, b) => Number(b.id.split('-')[1]) - Number(a.id.split('-')[1])).slice(0, 5);
    const getUserNameById = (userId: number) => users.find(u => u.id === userId)?.name || 'Unknown User';
    
    // 3. Get Low Stock Alerts
    const LOW_STOCK_THRESHOLD = 10;
    const lowStockItems = products.flatMap(product =>
        product.variants
            .filter(variant => variant.stock > 0 && variant.stock <= LOW_STOCK_THRESHOLD)
            .map(variant => ({
                productName: product.name,
                variantInfo: `${variant.size}`,
                stock: variant.stock,
                id: `${product.id}-${variant.id}`
            }))
    ).sort((a,b) => a.stock - b.stock).slice(0, 5);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Sales" value={`₹${totalSales.toLocaleString('en-IN')}`} icon={<SalesIcon />} />
                <StatCard title="Total Orders" value={totalOrders} icon={<OrdersIcon />} />
                <StatCard title="Orders Pending" value={pendingOrders} icon={<PendingIcon />} />
                <StatCard title="Orders Delivered" value={deliveredOrders} icon={<DeliveredIcon />} />
            </div>

            {/* Recent Activity & Stock Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                    {recentOrders.length > 0 ? (
                        <ul className="space-y-4">
                            {recentOrders.map(order => (
                                <li key={order.id} className="flex justify-between items-center text-sm hover:bg-gray-700/50 p-2 rounded-md">
                                    <Link to={`/admin/users/${order.userId}`} className="hover:underline">
                                        <span>#{order.id.slice(-6)} - {getUserNameById(order.userId)}</span>
                                    </Link>
                                    <span>₹{order.total.toLocaleString('en-IN')}</span>
                                    <span className={getStatusColor(order.status)}>{order.status}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-center py-4">No recent orders.</p>
                    )}
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Low Stock Alerts</h2>
                    {lowStockItems.length > 0 ? (
                        <ul className="space-y-2 text-sm">
                            {lowStockItems.map(item => (
                                <li key={item.id} className="flex justify-between hover:bg-gray-700/50 p-2 rounded-md">
                                    <span>{item.productName} ({item.variantInfo})</span>
                                    <span className={`font-bold ${item.stock <= 5 ? 'text-red-400' : 'text-yellow-400'}`}>
                                        {item.stock} left
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-center py-4">All products are well-stocked.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
