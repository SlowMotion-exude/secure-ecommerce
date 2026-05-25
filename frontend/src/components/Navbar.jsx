/**
 * Navigation Bar Component
 *
 * Responsive top navigation with:
 * - Brand logo with security indicator
 * - Navigation links (conditional on auth state)
 * - Search bar (expandable on mobile)
 * - Cart icon with item count badge
 * - User dropdown menu
 * - Mobile hamburger menu
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiSearch,
  FiLogOut,
  FiPackage,
  FiShield,
  FiChevronDown,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/" className="navbar-brand" onClick={() => setMobileMenuOpen(false)}>
          <FiShield className="brand-icon" />
          <span className="brand-text">SecureShop</span>
        </Link>

        {/* Desktop Search */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <FiSearch className="navbar-search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Desktop Nav Links */}
        <div className="navbar-links">
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/about" className="nav-link">About</Link>

          {isAuthenticated ? (
            <>
              <Link to="/cart" className="nav-link cart-link">
                <FiShoppingCart />
                <span className="cart-badge">0</span>
              </Link>

              <div className="user-dropdown-wrapper">
                <button
                  className="user-dropdown-trigger"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <div className="user-avatar">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <FiChevronDown className={`dropdown-arrow ${userDropdownOpen ? 'open' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className="user-dropdown-menu">
                    <div className="dropdown-header">
                      <span className="dropdown-email">{user?.email}</span>
                      <span className="dropdown-role">{user?.role || 'Customer'}</span>
                    </div>
                    <div className="dropdown-divider" />
                    <Link
                      to="/orders"
                      className="dropdown-item"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <FiPackage /> My Orders
                    </Link>
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <FiUser /> Profile
                    </Link>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                      <FiLogOut /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm nav-register-btn">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <form className="mobile-search" onSubmit={handleSearch}>
            <FiSearch className="navbar-search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <Link to="/products" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
            Products
          </Link>
          <Link to="/about" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/cart" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                <FiShoppingCart /> Cart
              </Link>
              <Link to="/orders" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                <FiPackage /> Orders
              </Link>
              <Link to="/profile" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                <FiUser /> Profile
              </Link>
              <div className="mobile-divider" />
              <button className="mobile-link mobile-logout" onClick={handleLogout}>
                <FiLogOut /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="mobile-link mobile-register" onClick={() => setMobileMenuOpen(false)}>
                Create Account
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
