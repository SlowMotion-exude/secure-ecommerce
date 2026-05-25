/**
 * Privacy Policy Page
 */

import { FiShield, FiLock, FiEye, FiDatabase } from 'react-icons/fi';

function PrivacyPolicy() {
  return (
    <div className="policy-page">
      <div className="policy-header">
        <FiShield size={48} />
        <h1>Privacy Policy</h1>
        <p>Your privacy is important to us. Here is how we protect your data.</p>
      </div>

      <div className="policy-content">
        <section className="policy-section">
          <h2><FiDatabase /> Data Collection</h2>
          <p>We collect only the information necessary to provide our services: your name, email, shipping address, and payment details. We never sell your data to third parties.</p>
        </section>

        <section className="policy-section">
          <h2><FiLock /> Data Protection</h2>
          <p>All data is encrypted at rest and in transit using AES-256 encryption. Passwords are hashed using bcrypt with 12 salt rounds. Payment data is processed securely through Stripe and never stored on our servers.</p>
        </section>

        <section className="policy-section">
          <h2><FiEye /> Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data at any time. Contact our support team to exercise these rights. We respond to all data requests within 72 hours.</p>
        </section>

        <section className="policy-section">
          <h2><FiShield /> Security Measures</h2>
          <ul>
            <li>256-bit SSL/TLS encryption for all communications</li>
            <li>PCI DSS compliance for payment processing</li>
            <li>FIDO2/WebAuthn biometric authentication support</li>
            <li>Regular security audits and penetration testing</li>
            <li>JWT-based secure session management</li>
            <li>CSRF, XSS, and SQL injection prevention</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
