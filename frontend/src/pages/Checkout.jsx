/**
 * Checkout Page
 *
 * Shipping form, order summary, and payment submission.
 */

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiShield, FiCreditCard, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../services/api';

function Checkout() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [shipping, setShipping] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await api.get('/cart');
        const data = response.data.data;
        if (!data.items || data.items.length === 0) {
          navigate('/cart');
          return;
        }
        setItems(data.items);
        setTotal(data.total);
      } catch {
        toast.error('Failed to load cart');
        navigate('/cart');
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, [navigate]);

  const handleShippingChange = (field) => (e) => {
    setShipping((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const shippingCost = total >= 50 ? 0 : 5.99;
  const tax = Number((total * 0.08).toFixed(2));
  const grandTotal = Number((total + shippingCost + tax).toFixed(2));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shipping.fullName || !shipping.address || !shipping.city || !shipping.zip) {
      toast.error('Please fill in all shipping fields');
      return;
    }
    setProcessing(true);
    try {
      await api.post('/payments/create-intent', {
        amount: grandTotal,
        shipping,
      });
      await api.delete('/cart/clear');
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch {
      toast.error('Payment processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="checkout-page">
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-section">
            <h3>Shipping Information</h3>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={shipping.fullName}
                onChange={handleShippingChange('fullName')}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                value={shipping.address}
                onChange={handleShippingChange('address')}
                placeholder="123 Main St"
                required
              />
            </div>
            <div className="form-row-grid">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  value={shipping.city}
                  onChange={handleShippingChange('city')}
                  placeholder="New York"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  type="text"
                  value={shipping.state}
                  onChange={handleShippingChange('state')}
                  placeholder="NY"
                />
              </div>
            </div>
            <div className="form-row-grid">
              <div className="form-group">
                <label htmlFor="zip">ZIP Code</label>
                <input
                  id="zip"
                  type="text"
                  value={shipping.zip}
                  onChange={handleShippingChange('zip')}
                  placeholder="10001"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select id="country" value={shipping.country} onChange={handleShippingChange('country')}>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                </select>
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <h3><FiCreditCard /> Payment</h3>
            <div className="payment-placeholder">
              <FiShield size={32} />
              <p>Stripe Sandbox — Payment will be simulated</p>
              <span className="payment-note">No real charges will be made</span>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-place-order"
            disabled={processing}
          >
            {processing ? 'Processing...' : `Place Order — $${grandTotal.toFixed(2)}`}
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="checkout-items">
            {items.map((item) => (
              <div key={item.product_id} className="checkout-item">
                <span className="checkout-item-name">{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-divider" />
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
          <div className="checkout-trust">
            <FiShield />
            <span>Secure checkout protected by SSL encryption</span>
          </div>
          <Link to="/cart" className="btn btn-outline btn-sm">
            <FiArrowLeft /> Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
