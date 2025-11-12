import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import ShieldIcon from '../../components/icons/ShieldIcon';

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);


const AdminLayout: React.FC = () => {
  const { isAdmin, logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAdmin) {
    return null; // or a loading spinner
  }
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 mt-2 text-white transition-colors duration-200 transform rounded-md hover:bg-gray-700 ${isActive ? 'bg-gray-700' : 'hover:text-white'}`;


  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Backdrop for mobile */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`w-64 flex-shrink-0 bg-gray-800 flex flex-col fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}>
        <div className="h-16 flex items-center justify-between text-xl font-bold border-b border-gray-700 px-4">
          <div className="flex items-center">
            <ShieldIcon className="w-7 h-7 mr-2 text-primary" />
            <span>Admin Panel</span>
          </div>
           <button className="lg:hidden p-1 -mr-1" onClick={() => setSidebarOpen(false)}>
              <span className="sr-only">Close sidebar</span>
              <XIcon className="h-6 w-6" />
           </button>
        </div>
        <nav className="flex-grow px-2 py-4">
          <NavLink to="/admin" end className={navLinkClass} onClick={() => setSidebarOpen(false)}>Dashboard</NavLink>
          <NavLink to="/admin/products" className={navLinkClass} onClick={() => setSidebarOpen(false)}>Products</NavLink>
          <NavLink to="/admin/orders" className={navLinkClass} onClick={() => setSidebarOpen(false)}>Orders</NavLink>
          <NavLink to="/admin/users" className={navLinkClass} onClick={() => setSidebarOpen(false)}>Users</NavLink>
          <NavLink to="/admin/reports" className={navLinkClass} onClick={() => setSidebarOpen(false)}>Reports</NavLink>
          <NavLink to="/admin/security" className={navLinkClass} onClick={() => setSidebarOpen(false)}>Security</NavLink>
        </nav>
        <div className="p-4 border-t border-gray-700">
            <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-white transition-colors duration-200 transform rounded-md hover:bg-gray-700">
                Logout
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center px-4 lg:px-6 justify-between lg:justify-end flex-shrink-0">
            <button className="lg:hidden text-white p-2 -ml-2" onClick={() => setSidebarOpen(true)}>
               <span className="sr-only">Open sidebar</span>
               <MenuIcon className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold">Welcome, Admin</h1>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
          <div key={location.pathname} className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;