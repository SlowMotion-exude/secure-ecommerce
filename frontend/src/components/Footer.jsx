/**
 * Footer Component
 *
 * Displays trust indicators, security badges, and privacy links.
 * These visual elements build user confidence (TAM: perceived security).
 */

import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>SecureShop</h4>
          <p>Secure e-commerce powered by trusted computing.</p>
        </div>

        <div className="footer-section">
          <h4>Security</h4>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/security">Security Information</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Trust Indicators</h4>
          <div className="trust-badges">
            <span className="badge" title="SSL/TLS Encrypted">🔐 SSL Secured</span>
            <span className="badge" title="PCI DSS Compliant Payments">💳 PCI Compliant</span>
            <span className="badge" title="FIDO2 Biometric Auth">🛡️ FIDO2 Certified</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SecureShop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
