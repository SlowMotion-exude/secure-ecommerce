/**
 * Cart Page
 *
 * Displays cart items with quantity controls, removal, totals,
 * and secure checkout button.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShield, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../services/api';

function Cart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadCart() {
      try {
        const response = await api.get('/cart');
        if (cancelled) return;
        const data = response.data.data;
        setItems(data.items || []);
        setTotal(data.total || 0);
      } catch {
        if (!cancelled) toast.error('Failed to load cart');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadCart();
    return () => { cancelled = true; };
  }, []);

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await api.put('/cart/update', { productId, quantity });
      const data = response.data.data;
      setItems(data.items);
      setTotal(data.total);
    } catch {
      toast.error('Failed to update quantity');
    }
  };

  const removeItem = async (productId) => {
    try {
      const response = await api.delete(`/cart/remove/${productId}`);
      const data = response.data.data;
      setItems(data.items);
      setTotal(data.total);
      toast.success('Item removed from cart');
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart/clear');
      setItems([]);
      setTotal(0);
      toast.success('Cart cleared');
    } catch {
      toast.error('Failed to clear cart');
    }
  };

  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-loading">
          <div className="loading-spinner" />
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <FiShoppingCart size={64} className="cart-empty-icon" />
          <h2>Your Cart is Empty</h2>
          <p>Browse our products and add items to your cart</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            <FiArrowLeft /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const shippingCost = total >= 50 ? 0 : 5.99;
  const tax = Number((total * 0.08).toFixed(2));
  const grandTotal = Number((total + shippingCost + tax).toFixed(2));

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.product_id} className="cart-item">
              <div
                className="cart-item-image"
                style={{ backgroundColor: '#6366f1' }}
              >
                <span>{item.name.charAt(0)}</span>
              </div>
              <div className="cart-item-info">
                <Link to={`/products/${item.product_id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <span className="cart-item-price">${Number(item.price).toFixed(2)}</span>
              </div>
              <div className="cart-item-quantity">
                <button
                  onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <FiMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>
                  <FiPlus />
                </button>
              </div>
              <span className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button className="cart-item-remove" onClick={() => removeItem(item.product_id)}>
                <FiTrash2 />
              </button>
            </div>
          ))}
          <div className="cart-actions">
            <Link to="/products" className="btn btn-outline">
              <FiArrowLeft /> Continue Shopping
            </Link>
            <button className="btn btn-outline btn-danger" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
          </div>
          <div className="summary-row">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-lg btn-checkout">
            Proceed to Checkout
          </Link>
          <div className="cart-trust">
            <FiShield />
            <span>Secure checkout with 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
