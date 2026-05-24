/**
 * Footer Component
 *
 * Multi-column footer with trust indicators, navigation,
 * contact information, and security badges.
 */

import { Link } from 'react-router-dom';
import {
  FiShield,
  FiLock,
  FiCreditCard,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
} from 'react-icons/fi';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col">
            <div className="footer-brand">
              <FiShield className="footer-brand-icon" />
              <span>SecureShop</span>
            </div>
            <p className="footer-brand-desc">
              Secure e-commerce platform powered by trusted computing,
              biometric authentication, and encrypted payments.
            </p>
            <div className="footer-social">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/orders">Order Tracking</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-col">
            <h4>Customer Service</h4>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/security">Security Info</Link></li>
              <li><Link to="/about#contact">Contact Us</Link></li>
              <li><Link to="/about#faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li><FiMail /> support@secureshop.com</li>
              <li><FiPhone /> +1 (555) 123-4567</li>
              <li><FiMapPin /> 123 Secure St, Digital City</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Strip */}
      <div className="footer-trust">
        <div className="footer-trust-inner">
          <div className="footer-trust-badge">
            <FiLock /> SSL Secured
          </div>
          <div className="footer-trust-badge">
            <FiCreditCard /> PCI Compliant
          </div>
          <div className="footer-trust-badge">
            <FiShield /> FIDO2 Certified
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SecureShop. All rights reserved.</p>
        <p className="footer-bottom-note">
          Protected by enterprise-grade security. Your data is safe with us.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
