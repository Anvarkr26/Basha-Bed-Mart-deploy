import React, { useState } from 'react';
import ShieldIcon from '../../components/icons/ShieldIcon';
import { useAppContext } from '../../hooks/useAppContext';

const AdminSecurityPage: React.FC = () => {
    const { adminUsers, addAdminUser, removeAdminUser, resetData } = useAppContext();

    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [resetMessage, setResetMessage] = useState('');

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Password updated successfully! (This is a mock action)");
    };

    const handleAddAdminSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUsername || !newPassword) {
            setMessage('Username and password cannot be empty.');
            return;
        }
        addAdminUser(newUsername, newPassword);
        setNewUsername('');
        setNewPassword('');
        setMessage(`Admin user '${newUsername}' added successfully.`);
        setTimeout(() => setMessage(''), 3000);
    };

    const handleResetData = () => {
        if (window.confirm('Are you sure you want to reset all application data (products, users, orders)? This action cannot be undone.')) {
            resetData();
            setResetMessage('All application data has been reset to the initial state.');
            setTimeout(() => setResetMessage(''), 4000);
        }
    };

    const inputClasses = "w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary focus:border-primary";

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Security Settings</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Change Password */}
                <div className="bg-gray-800 rounded-lg shadow-md p-8 self-start">
                    <div className="flex items-center space-x-3 mb-6">
                        <ShieldIcon className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl font-semibold">Change Admin Password</h2>
                    </div>
                    
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="current-password" className="block text-sm font-medium text-gray-200 mb-1">Current Password</label>
                            <input type="password" id="current-password" className={inputClasses} required />
                        </div>
                        <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-200 mb-1">New Password</label>
                            <input type="password" id="new-password" className={inputClasses} required />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-200 mb-1">Confirm New Password</label>
                            <input type="password" id="confirm-password" className={inputClasses} required />
                        </div>
                        <div className="pt-4">
                            <button type="submit" className="w-full bg-secondary hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition-colors">
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>

                {/* Manage Admins */}
                <div className="bg-gray-800 rounded-lg shadow-md p-8">
                     <div className="flex items-center space-x-3 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.283.356-1.857m0 0a3.001 3.001 0 015.688 0M12 12a3 3 0 100-6 3 3 0 000 6z" /></svg>
                        <h2 className="text-2xl font-semibold">Manage Admin Users</h2>
                    </div>

                    {/* Current Admins List */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-200 mb-2">Current Admins</h3>
                        <ul className="space-y-2">
                            {adminUsers.map(admin => (
                                <li key={admin.id} className="flex justify-between items-center bg-gray-700/50 p-2 rounded-md">
                                    <span>{admin.username}</span>
                                    <button 
                                        onClick={() => removeAdminUser(admin.id)}
                                        className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={adminUsers.length <= 1}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Add New Admin Form */}
                    <form onSubmit={handleAddAdminSubmit} className="space-y-4 border-t border-gray-700 pt-6">
                        <h3 className="text-lg font-medium text-gray-200">Add New Admin</h3>
                        <div>
                            <label htmlFor="new-username" className="block text-sm font-medium text-gray-200 mb-1">Username</label>
                            <input 
                                type="text" 
                                id="new-username" 
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className={inputClasses} 
                            />
                        </div>
                        <div>
                            <label htmlFor="add-new-password" className="block text-sm font-medium text-gray-200 mb-1">Password</label>
                            <input 
                                type="password" 
                                id="add-new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className={inputClasses} 
                            />
                        </div>
                        <div className="pt-2">
                            <button type="submit" className="w-full bg-primary hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors">
                                Add Admin
                            </button>
                        </div>
                        {message && <p className="text-green-400 text-sm text-center pt-2">{message}</p>}
                    </form>
                </div>
            </div>
            
            {/* Danger Zone */}
            <div className="mt-8 bg-gray-800 rounded-lg shadow-md p-8 border border-red-500/50">
                <h2 className="text-2xl font-semibold text-red-400 mb-4">Danger Zone</h2>
                <p className="text-gray-300 mb-4">
                    Resetting the data will restore all products, users, and orders to their original state. This action does not affect admin credentials and cannot be undone.
                </p>
                <button 
                    onClick={handleResetData}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors"
                >
                    Reset Application Data
                </button>
                {resetMessage && <p className="text-green-400 text-sm mt-4">{resetMessage}</p>}
            </div>

        </div>
    );
};

export default AdminSecurityPage;