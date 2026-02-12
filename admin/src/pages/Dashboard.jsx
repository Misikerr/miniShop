import React, { useState, useEffect } from 'react';
import { Package, ShoppingBag, DollarSign } from 'lucide-react';
import API from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data: products } = await API.get('/products');
                const { data: orders } = await API.get('/orders');
                
                const revenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
                
                setStats({ 
                    products: products.length, 
                    orders: orders.length,
                    revenue: revenue
                }); 
            } catch (error) {
                console.error('Failed to fetch stats');
                console.log( error.message );
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="fade-in">
            <h1>Business Overview</h1>
            <div className="stats-grid">
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Package size={24} color="#6366f1" />
                    </div>
                    <h3>Total Products</h3>
                    <div className="value">{stats.products}</div>
                </div>
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <ShoppingBag size={24} color="#10b981" />
                    </div>
                    <h3>Total Orders</h3>
                    <div className="value">{stats.orders}</div>
                </div>
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <DollarSign size={24} color="#f59e0b" />
                    </div>
                    <h3>Total Revenue</h3>
                    <div className="value">${stats.revenue.toFixed(2)}</div>
                </div>
            </div>

            <div className="card">
                <h2>Welcome to miniShop Admin</h2>
                <p style={{ color: '#64748b', marginTop: '1rem' }}>
                    From here you can manage your inventory and track customer orders in real-time. 
                    Use the navigation above to get started.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
