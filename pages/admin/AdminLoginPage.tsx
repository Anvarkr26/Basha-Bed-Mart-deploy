import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';

const AdminLoginPage: React.FC = () => {
    const { login, adminUsers } = useAppContext();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const foundAdmin = adminUsers.find(admin => admin.username === username && admin.password === password);

        if (foundAdmin) {
            setError('');
            login({ admin: true });
            navigate('/admin');
        } else {
            setError('Invalid username or password.');
        }
    };

    const inputClasses = "w-full px-4 py-3 bg-[#2a3649] border border-transparent rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300";

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0d121c] text-white p-4">
            <div className="max-w-sm w-full space-y-8 bg-[#1a2332] p-8 rounded-2xl shadow-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">
                        Admin Access
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">Please enter your credentials to continue.</p>
                </div>
                <form className="space-y-6" onSubmit={handleAdminLogin}>
                    <div>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={inputClasses}
                            placeholder="username"
                        />
                    </div>
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={inputClasses}
                            placeholder="password"
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm text-center !mt-4">{error}</p>}

                    <div>
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a2332] focus:ring-primary transition-colors duration-300">
                            Sign in
                        </button>
                    </div>
                </form>
                 <div className="text-center pt-4">
                    <Link to="/" className="font-medium text-sm text-gray-400 hover:text-primary transition-colors duration-300">
                        ← Back to User Pages
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;