import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { ShoppingBag, User } from 'lucide-react';
import API from '../services/api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await API.get('/orders');
                setOrders(data);
            } catch (error) {
                toast.error('Failed to load orders');
                console.log( error.message );
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="text-center" style={{padding: '5rem'}}>Loading orders...</div>;

    return (
        <div className="fade-in">
            <h1>Customer Orders</h1>
            
            <div className="card" style={{ padding: '0' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--admin-border)' }}>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Recent orders from all users</p>
                </div>
                
                <div style={{ overflowX: 'auto' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                                        No orders found in the system.
                                    </td>
                                </tr>
                            ) : (
                                orders.map(order => (
                                    <tr key={order._id}>
                                        <td style={{ fontSize: '0.8rem', color: '#64748b' }}>#{order._id.slice(-6)}</td>
                                        <td style={{ fontWeight: '600' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <User size={14} />
                                                {order.user?.name || 'Guest'}
                                            </div>
                                        </td>
                                        <td>{order.orderItems.length} items</td>
                                        <td style={{ fontWeight: '700', color: 'var(--admin-primary)' }}>${order.totalPrice.toFixed(2)}</td>
                                        <td>
                                            <span style={{ 
                                                padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', 
                                                fontWeight: '700', background: '#fef3c7', color: '#92400e' 
                                            }}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: '0.85rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
