/**
 * Navigation Bar Component
 *
 * Responsive top navigation with:
 * - Brand logo/name
 * - Navigation links (conditional on auth state)
 * - Cart icon with item count
 * - Login/Logout button
 * - Security trust indicator
 *
 * Full styling in Phase 12. Basic structure established here.
 */

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="trust-badge" title="Secure Connection">🔒</span>
          {' '}
          SecureShop
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/products">Products</Link>

        {isAuthenticated ? (
          <>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
            <span className="navbar-user">
              {user?.email}
            </span>
            <button onClick={logout} className="btn btn-outline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
