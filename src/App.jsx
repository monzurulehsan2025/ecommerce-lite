import React, { useState, useEffect } from 'react';

const PRODUCTS = [
  {
    id: 1,
    title: "Clinical-Strength Joint Supplement",
    category: "Supplements",
    price: 45.00,
    description: "Formulated with Glucosamine, Chondroitin, and Turmeric to support mobility and joint comfort.",
    image: "/joint-supplement.png"
  },
  {
    id: 2,
    title: "Vitamin C Booster Serum",
    category: "Skincare",
    price: 38.00,
    description: "A potent 15% Vitamin C serum designed to brighten skin tone and reduce the appearance of dark spots.",
    image: "/vitamin-c.png"
  },
  {
    id: 3,
    title: "Restorative Sleep Elixir",
    category: "Wellness",
    price: 32.00,
    description: "A calming botanical blend of Lavender and Melatonin to help you drift into a deep, restful sleep.",
    image: "/sleep-elixir.png"
  },
  {
    id: 4,
    title: "Organic Greens Power Blend",
    category: "Superfoods",
    price: 49.00,
    description: "Rich in spirulina, kale, and wheatgrass. One scoop provides your daily serving of vital greens.",
    image: "/greens-powder.png"
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-content">
          <a href="#" className="logo">AURA WELLNESS</a>
          <button className="cart-icon" onClick={() => setIsCartOpen(true)}>
            🛒 <span className="cart-count">{cartCount}</span>
            <span>Cart</span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="container">
          <h1>Purity in Every Dose.</h1>
          <p>Science-backed health and wellness products designed for your peak performance and daily rituals.</p>
        </div>
      </header>

      {/* Product Catalog */}
      <main className="container">
        <div className="product-grid">
          {PRODUCTS.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  <button className="add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>✕</button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '40px', color: '#888' }}>Your cart is empty.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} className="cart-item-img" />
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.title}</h4>
                      <p className="cart-item-price">${item.price.toFixed(2)}</p>
                      <div className="quantity-controls">
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                        <span>{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" disabled={cart.length === 0}>
                Checkout Now
              </button>
              <p style={{ fontSize: '0.8rem', textAlign: 'center', marginTop: '16px', color: '#999' }}>
                Free shipping on orders over $50
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
