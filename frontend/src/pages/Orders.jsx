/**
 * Orders Page
 *
 * Displays user order history with status tracking.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiShoppingCart } from 'react-icons/fi';

function Orders() {
  const [orders] = useState([]);

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <h1>My Orders</h1>
        <div className="orders-empty">
          <FiPackage size={64} className="orders-empty-icon" />
          <h2>No Orders Yet</h2>
          <p>When you place orders, they will appear here for tracking.</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            <FiShoppingCart /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-number">Order #{order.order_number}</span>
              <span className={`order-status status-${order.status}`}>{order.status}</span>
            </div>
            <div className="order-details">
              <span>Total: ${Number(order.total).toFixed(2)}</span>
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
