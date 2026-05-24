/**
 * Home Page
 *
 * Landing page showcasing the platform's security features.
 * Designed to build user trust (TAM: perceived usefulness & security).
 * Full implementation in Phase 12.
 */

import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to SecureShop</h1>
        <p>
          Shop with confidence. Our platform uses enterprise-grade security
          including biometric authentication, encrypted payments, and trusted
          computing verification.
        </p>
        <div className="hero-actions">
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
          <Link to="/register" className="btn btn-outline">
            Create Account
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🔐 Biometric Security</h3>
          <p>Login with your fingerprint using WebAuthn/FIDO2 standard.</p>
        </div>
        <div className="feature-card">
          <h3>💳 Secure Payments</h3>
          <p>PCI-compliant payment processing powered by Stripe.</p>
        </div>
        <div className="feature-card">
          <h3>🛡️ Trusted Computing</h3>
          <p>Device verification and trust scoring protect your account.</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Data Protection</h3>
          <p>End-to-end encryption with bcrypt password hashing.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
