import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { ShoppingCart, Eye } from 'lucide-react';
import API from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setProducts(data);
      } catch (error) {
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exist = cart.find(x => x._id === product._id);
    if (exist) {
      cart = cart.map(x => x._id === product._id ? { ...x, qty: x.qty + 1 } : x);
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) return <div className="container" style={{padding: '4rem', textAlign: 'center'}}>Loading products...</div>;

  return (
    <div className="fade-in">
      <header className="hero">
        <div className="container">
          <h1>Welcome to miniShop</h1>
          <p style={{color: 'var(--text-muted)'}}>The simple way to buy what you love.</p>
        </div>
      </header>

      <main className="container" style={{paddingBottom: '4rem'}}>
        <div className="section-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
          <h2 style={{fontFamily: 'Outfit', fontWeight: '700'}}>Our Products</h2>
          <span style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{products.length} Items found</span>
        </div>

        {products.length === 0 ? (
          <div className="card text-center" style={{padding: '4rem'}}>
            <p>No products available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid">
            {products.map((product) => (
              <div key={product._id} className="card product-card">
                <img src={product.image} alt={product.name} />
                <div className="card-content">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="card-footer">
                    <span className="price">${product.price}</span>
                    <button className="btn btn-primary" onClick={() => addToCart(product)} style={{padding: '0.6rem'}}>
                      <ShoppingCart size={18} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
