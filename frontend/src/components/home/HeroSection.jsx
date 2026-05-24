/**
 * Hero Section
 *
 * Landing page hero with headline, description, search bar, and CTAs.
 * Designed to immediately communicate trust and security.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShield, FiLock } from 'react-icons/fi';

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-bg-pattern" />
      <div className="hero-content">
        <div className="hero-badge">
          <FiShield /> Trusted & Secure Platform
        </div>
        <h1 className="hero-title">
          Shop with <span className="hero-highlight">Confidence</span>
        </h1>
        <p className="hero-description">
          Experience the future of secure e-commerce. Our platform combines
          biometric authentication, trusted computing verification, and
          encrypted payments to keep you safe.
        </p>

        <form className="hero-search" onSubmit={handleSearch}>
          <FiSearch className="hero-search-icon" />
          <input
            type="text"
            placeholder="Search products, categories, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="hero-search-input"
          />
          <button type="submit" className="hero-search-btn">Search</button>
        </form>

        <div className="hero-actions">
          <Link to="/products" className="btn btn-primary btn-lg">
            Browse Products
          </Link>
          <Link to="/register" className="btn btn-outline btn-lg">
            Create Account
          </Link>
        </div>

        <div className="hero-trust-strip">
          <span><FiLock /> 256-bit SSL Encryption</span>
          <span><FiShield /> Biometric Protected</span>
          <span><FiLock /> PCI DSS Compliant</span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
