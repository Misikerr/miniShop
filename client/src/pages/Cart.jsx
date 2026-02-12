import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const removeItem = (id) => {
    const newItems = cartItems.filter(x => x._id !== id);
    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="container fade-in" style={{ padding: '3rem 0' }}>
      <h1 style={{ fontFamily: 'Outfit', fontWeight: '800', marginBottom: '2rem' }}>Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="card text-center" style={{ padding: '4rem' }}>
          <ShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Your cart is empty.</p>
          <Link to="/" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="card" style={{ padding: '0' }}>
            {/* Desktop Table */}
            <div className="desktop-cart">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)' }}>PRODUCT</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)' }}>PRICE</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)' }}>QTY</th>
                    <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item._id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '1.5rem 1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src={item.image} alt="" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                        <span style={{ fontWeight: '600' }}>{item.name}</span>
                      </td>
                      <td style={{ padding: '1rem' }}>${item.price}</td>
                      <td style={{ padding: '1rem' }}>{item.qty}</td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button className="btn btn-danger" onClick={() => removeItem(item._id)} style={{ padding: '0.5rem' }}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="mobile-cart" style={{ display: 'none', padding: '1rem' }}>
                {cartItems.map(item => (
                    <div key={item._id} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                        <img src={item.image} alt="" style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{item.name}</div>
                            <div style={{ color: 'var(--primary)', fontWeight: '700', marginBottom: '0.5rem' }}>${item.price}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Qty: {item.qty}</span>
                                <button className="btn btn-danger" onClick={() => removeItem(item._id)} style={{ padding: '0.4rem' }}>
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontFamily: 'Outfit' }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Shipping</span>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>Free</span>
            </div>
            <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: '800' }}>
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem' }}
              onClick={() => navigate(user ? '/checkout' : '/login')}
            >
              Checkout Now
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
