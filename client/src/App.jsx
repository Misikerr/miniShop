import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth, AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav>
      <div className="container">
        <Link to="/" className="brand">mini<span>Shop</span></Link>
        <div className="nav-links">
          <NavLink to="/" end>Products</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Hi, <strong>{user.name}</strong></span>
              <button className="btn btn-danger" onClick={logout} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Logout</button>
            </div>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register" className="btn btn-primary" style={{ color: 'white', padding: '0.5rem 1rem' }}>Get Started</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Toaster position="bottom-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
