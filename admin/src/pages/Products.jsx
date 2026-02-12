import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, Package } from 'lucide-react';
import API from '../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '', price: '', image: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await API.get('/products');
            setProducts(data);
        } catch (error) {
            toast.error('Failed to load products');
            console.log( error.message );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/products', formData);
            toast.success('Product added successfully!');
            setFormData({ name: '', description: '', price: '', image: '' });
            fetchProducts();
        } catch (error) {
            toast.error('Failed to add product');
            console.log( error.message );
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await API.delete(`/products/${id}`);
                toast.success('Product deleted');
                fetchProducts();
            } catch (error) {
                toast.error('Delete failed');
                console.log( error.message );
            }
        }
    };

    return (
        <div className="fade-in">
            <div className="section-header">
                <h1 style={{ fontFamily: 'Outfit', fontWeight: '800' }}>Manage Products</h1>
                <span className="btn btn-outline" style={{ pointerEvents: 'none' }}>
                    <Package size={18} />
                    {products.length} Total
                </span>
            </div>

            <div className="card">
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Add New Product</h2>
                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input 
                            placeholder="e.g. Premium Wireless Headphones"
                            value={formData.name} 
                            onChange={e => setFormData({ ...formData, name: e.target.value })} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Price ($)</label>
                        <input 
                            type="number" 
                            placeholder="0.00"
                            value={formData.price} 
                            onChange={e => setFormData({ ...formData, price: e.target.value })} 
                            required 
                        />
                    </div>
                    <div className="form-group full">
                        <label>Image URL</label>
                        <input 
                            placeholder="https://images.unsplash.com/..."
                            value={formData.image} 
                            onChange={e => setFormData({ ...formData, image: e.target.value })} 
                            required 
                        />
                    </div>
                    <div className="form-group full">
                        <label>Description</label>
                        <textarea 
                            placeholder="Describe the product features..."
                            value={formData.description} 
                            onChange={e => setFormData({ ...formData, description: e.target.value })} 
                            required 
                            rows="4" 
                        />
                    </div>
                    <div className="full" style={{ textAlign: 'right' }}>
                        <button type="submit" className="btn btn-primary" style={{ width: '200px' }}>
                            <Plus size={18} />
                            Add Product
                        </button>
                    </div>
                </form>
            </div>

            <div className="card" style={{ padding: '0' }}>
                <div style={{ padding: '1.5rem 2rem' }}>
                    <h2 style={{ fontSize: '1.25rem' }}>Product Inventory</h2>
                </div>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Preview</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center" style={{ padding: '3rem', color: 'var(--admin-text-muted)' }}>
                                        No products found in the database.
                                    </td>
                                </tr>
                            ) : (
                                products.map(p => (
                                    <tr key={p._id}>
                                        <td>
                                            <img 
                                                src={p.image} 
                                                alt="" 
                                                style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--admin-border)' }} 
                                            />
                                        </td>
                                        <td style={{ fontWeight: '600' }}>{p.name}</td>
                                        <td style={{ color: 'var(--admin-primary)', fontWeight: '700' }}>${p.price}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="btn btn-danger" onClick={() => handleDelete(p._id)}>
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                        </td>
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

export default Products;
