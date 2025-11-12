import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    const { currentUser } = useAppContext();

    if (!currentUser) {
        return (
             <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold">Please log in to view your profile.</h1>
                <Link to="/login" className="mt-4 inline-block bg-primary text-white font-bold py-2 px-4 rounded">Login</Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">My Profile</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {/* Personal Details */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Full Name</label>
                                <p className="text-lg">{currentUser.name}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Email Address</label>
                                <p className="text-lg">{currentUser.email}</p>
                            </div>
                        </div>
                        <button className="mt-6 text-sm text-primary hover:underline">Edit Details</button>
                    </div>

                    {/* Shipping Addresses */}
                     <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                        <h2 className="text-2xl font-semibold mb-4">My Addresses</h2>
                        <div className="space-y-4">
                            {currentUser.addresses.map(address => (
                                <div key={address.id} className="border p-4 rounded-md">
                                    <p>{address.street}, {address.city}</p>
                                    <p>{address.state} - {address.zip}</p>
                                    {address.isDefault && <span className="text-xs bg-green-100 text-green-800 font-medium px-2 py-1 rounded-full mt-2 inline-block">Default</span>}
                                </div>
                            ))}
                        </div>
                        <button className="mt-6 text-sm text-secondary hover:underline">Add New Address</button>
                    </div>
                </div>

                {/* Quick Links */}
                <aside>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                        <nav className="flex flex-col space-y-2">
                            <Link to="/orders" className="text-primary hover:underline">My Orders</Link>
                            <a href="#" className="text-primary hover:underline">Settings</a>
                            <a href="#" className="text-primary hover:underline">Help & Support</a>
                        </nav>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ProfilePage;