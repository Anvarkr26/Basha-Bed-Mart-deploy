import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';

const AdminUsersListPage: React.FC = () => {
    const { users, addUser, removeUser } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [userToRemove, setUserToRemove] = useState<{ id: number, name: string } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleAddUserSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!newUser.name || !newUser.email || !newUser.password) {
            setError('All fields are required.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newUser.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (newUser.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        const result = addUser(newUser.name, newUser.email, newUser.password);
        if (!result.success) {
            setError(result.message || 'Failed to add user.');
        } else {
            setIsModalOpen(false);
            setNewUser({ name: '', email: '', password: '' });
        }
    };

    const handleRemoveUserClick = (user: {id: number, name: string}) => {
        setUserToRemove(user);
    };

    const confirmRemoveUser = () => {
        if (userToRemove) {
            removeUser(userToRemove.id);
            setUserToRemove(null);
        }
    };

    const handleOpenModal = () => {
        setError('');
        setNewUser({ name: '', email: '', password: '' });
        setIsModalOpen(true);
    }

    const inputClasses = "w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary focus:border-primary text-white";

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Users</h1>
                <button 
                    onClick={handleOpenModal}
                    className="bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                    Add User
                </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-sm text-left text-white">
                    <thead className="text-xs text-gray-100 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">User ID</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="px-6 py-4 font-medium">{user.id}</td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4 space-x-4">
                                    <Link to={`/admin/users/${user.id}`} className="font-medium text-blue-400 hover:underline">
                                        View Details
                                    </Link>
                                    <button 
                                        onClick={() => handleRemoveUserClick(user)}
                                        className="font-medium text-red-400 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in-down" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-6 text-white">Add New User</h2>
                        <form onSubmit={handleAddUserSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">Full Name</label>
                                <input type="text" id="name" name="name" value={newUser.name} onChange={handleInputChange} className={inputClasses} required />
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email</label>
                                <input type="email" id="email" name="email" value={newUser.email} onChange={handleInputChange} className={inputClasses} required />
                            </div>
                             <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">Password</label>
                                <input type="password" id="password" name="password" value={newUser.password} onChange={handleInputChange} className={inputClasses} required />
                            </div>
                            
                            {error && <p className="text-red-400 text-sm text-center pt-1">{error}</p>}

                            <div className="flex justify-end space-x-4 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                                    Add User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Remove User Confirmation Modal */}
            {userToRemove && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in-down" onClick={() => setUserToRemove(null)}>
                    <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-4 text-white">Confirm Removal</h2>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to remove the user "{userToRemove.name}"? This action will also delete all of their associated orders and cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setUserToRemove(null)}
                                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmRemoveUser}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors"
                            >
                                Confirm & Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsersListPage;
