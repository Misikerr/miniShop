import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LayoutDashboard, Package, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  if (loading) return <div className="text-center" style={{padding: '5rem'}}>Verifying session...</div>;
  if (!admin) return <Navigate to="/login" />;
  return children;
};

const Navbar = () => {
  const { admin, logout } = useAuth();
  return (
    <nav>
      <div className="container">
        <Link to="/" className="admin-logo">mini<span>Shop</span> Admin</Link>
        {admin && (
          <div className="nav-links">
            <NavLink to="/" end>
                <LayoutDashboard size={18} style={{ marginRight: '6px' }} />
                Dashboard
            </NavLink>
            <NavLink to="/products">
                <Package size={18} style={{ marginRight: '6px' }} />
                Inventory
            </NavLink>
            <NavLink to="/orders">
                <ShoppingBag size={18} style={{ marginRight: '6px' }} />
                Orders
            </NavLink>
            <button className="btn btn-danger" onClick={logout} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'rgba(239, 35, 60, 0.2)', border: '1px solid #ef233c', marginLeft: '0.5rem' }}>
                <LogOut size={14} style={{ marginRight: '6px' }} />
                Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            </Routes>
        </div>
        <Toaster position="bottom-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
