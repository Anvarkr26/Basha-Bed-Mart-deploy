
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Product } from '../../types';

const StatCard: React.FC<{ title: string; value: string | number; }> = ({ title, value }) => (
    <div className="bg-gray-800 p-6 rounded-lg">
        <p className="text-sm text-gray-200">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
);

const AdminOrderReportPage: React.FC = () => {
    const { orders, products } = useAppContext();

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;

    // FIX: Replaced mocked sorting with actual sales data calculation.
    // The 'stock' property does not exist on the Product type and sorting by it is not representative of sales.
    // This now calculates total units sold per product from all orders.
    const productSales = orders.flatMap(o => o.items).reduce((acc, item) => {
        // FIX: The `CartItem` type uses `productId`, not `id`, to reference the product.
        acc[item.productId] = (acc[item.productId] || 0) + item.quantity;
        return acc;
    }, {} as Record<number, number>);

    const topSellingProducts = products
        .map(p => ({
            ...p,
            unitsSold: productSales[p.id] || 0
        }))
        .sort((a, b) => b.unitsSold - a.unitsSold)
        .slice(0, 5);


    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Order Reports</h1>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} />
                <StatCard title="Total Orders" value={totalOrders} />
                <StatCard title="Average Order Value" value={`₹${avgOrderValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Sales Over Time</h2>
                    <div className="h-64 bg-gray-700 rounded-md flex items-center justify-center">
                        <p className="text-gray-300">[Chart Placeholder]</p>
                    </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Order Status Distribution</h2>
                    <div className="h-64 bg-gray-700 rounded-md flex items-center justify-center">
                        <p className="text-gray-300">[Pie Chart Placeholder]</p>
                    </div>
                </div>
            </div>

            {/* Top Products */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
                 <ul className="space-y-2 text-sm">
                    {topSellingProducts.map((p, index) => (
                        <li key={p.id} className="flex justify-between p-2 rounded-md hover:bg-gray-700">
                           <span>{index+1}. {p.name}</span>
                           <span className="font-bold">{p.unitsSold} units sold</span>
                        </li>
                    ))}
                 </ul>
            </div>
        </div>
    );
};

export default AdminOrderReportPage;