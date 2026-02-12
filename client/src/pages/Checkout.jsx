import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CreditCard, CheckCircle } from 'lucide-react';
import API from '../services/api';

const Checkout = () => {
    const navigate = useNavigate();
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const handlePlaceOrder = async () => {
        const toastId = toast.loading('Processing your order...');
        try {
            const orderData = {
                orderItems: cartItems.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    image: item.image,
                    price: item.price,
                    product: item._id
                })),
                totalPrice
            };
            await API.post('/orders', orderData);
            localStorage.removeItem('cart');
            toast.success('Order placed successfully!', { id: toastId });
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order', { id: toastId });
        }
    };

    if (cartItems.length === 0) return (
        <div className="container text-center" style={{ padding: '6rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>No items to checkout.</p>
        </div>
    );

    return (
        <div className="container fade-in" style={{ padding: '4rem 0' }}>
            <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ 
                        width: '64px', height: '64px', background: 'rgba(67, 97, 238, 0.1)', 
                        borderRadius: '50%', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', margin: '0 auto 1rem' 
                    }}>
                        <CreditCard size={32} style={{ color: 'var(--primary)' }} />
                    </div>
                    <h2 style={{ fontFamily: 'Outfit', fontWeight: '800' }}>Confirm Order</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Please review your order details before proceeding</p>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span>Quantity</span>
                        <strong>{cartItems.reduce((a, b) => a + b.qty, 0)} Items</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem' }}>
                        <span>Total Balance</span>
                        <strong style={{ color: 'var(--primary)' }}>${totalPrice.toFixed(2)}</strong>
                    </div>
                </div>

                <button className="btn btn-primary" onClick={handlePlaceOrder} style={{ width: '100%', padding: '1rem' }}>
                    <CheckCircle size={18} />
                    Place Secure Order
                </button>
                
                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Your transaction is encrypted and secure.
                </p>
            </div>
        </div>
    );
};

export default Checkout;
