import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';

const SignupPage: React.FC = () => {
  const { signup } = useAppContext();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }

    const result = signup(name, email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Signup failed. Please try again.');
    }
  };
  
  const inputClasses = "appearance-none rounded-none relative block w-full px-3 py-2 bg-white border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors duration-300";

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg animate-zoom-in">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="full-name" className="sr-only">Full Name</label>
              <input 
                id="full-name" 
                name="name" 
                type="text" 
                required 
                className={`${inputClasses} rounded-t-md`} 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="signup-email" className="sr-only">Email address</label>
              <input 
                id="signup-email" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                className={inputClasses} 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="sr-only">Password</label>
              <input 
                id="signup-password" 
                name="password" 
                type="password" 
                autoComplete="new-password" 
                required 
                className={`${inputClasses} rounded-b-md`} 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300">
              Sign up
            </button>
          </div>
        </form>
        <div className="text-center">
            <Link to="/login" className="font-medium text-sm text-primary hover:text-red-700 transition-colors duration-300">
                Already have an account? Sign in
            </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;