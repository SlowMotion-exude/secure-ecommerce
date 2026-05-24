/**
 * About Us Page
 *
 * Company overview, mission, vision, security commitment,
 * payment security explanation, and contact information.
 */

import {
  FiShield,
  FiTarget,
  FiEye,
  FiLock,
  FiCreditCard,
  FiSmartphone,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
} from 'react-icons/fi';

function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <h1>About SecureShop</h1>
        <p>
          Building the future of trusted e-commerce through
          advanced security and user-centric design.
        </p>
      </section>

      {/* Company Overview */}
      <section className="about-section">
        <div className="about-grid-2">
          <div>
            <h2><FiShield className="about-icon" /> Who We Are</h2>
            <p>
              SecureShop is a secure e-commerce platform built as a university research project
              exploring the intersection of trusted computing, biometric authentication,
              and modern e-commerce. Our platform demonstrates how cutting-edge security
              technologies can be seamlessly integrated into everyday online shopping.
            </p>
            <p>
              We believe that security should never compromise user experience. Every
              feature is designed to be both highly secure and effortlessly simple to use,
              following the Technology Acceptance Model (TAM) principles.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-number">256-bit</span>
              <span className="stat-label">SSL Encryption</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">FIDO2</span>
              <span className="stat-label">Biometric Standard</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">PCI DSS</span>
              <span className="stat-label">Payment Compliance</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">12</span>
              <span className="stat-label">Salt Rounds (bcrypt)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-section about-section-alt">
        <div className="about-grid-2">
          <div className="mission-card">
            <FiTarget className="mission-icon" />
            <h3>Our Mission</h3>
            <p>
              To provide a secure, transparent, and user-friendly e-commerce
              experience that leverages trusted computing platform concepts,
              biometric authentication, and advanced security measures to
              protect every transaction and build lasting customer trust.
            </p>
          </div>
          <div className="mission-card">
            <FiEye className="mission-icon" />
            <h3>Our Vision</h3>
            <p>
              To become a model for how e-commerce platforms should handle
              security — where every user can shop with complete confidence,
              knowing their identity, payment data, and personal information
              are protected by enterprise-grade security architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Security Commitment */}
      <section className="about-section">
        <h2 className="section-center-title">
          <FiLock className="about-icon" /> Our Security Commitment
        </h2>
        <div className="security-features">
          <div className="security-feature">
            <FiSmartphone className="sf-icon" />
            <h4>Biometric Authentication</h4>
            <p>
              WebAuthn/FIDO2 fingerprint authentication eliminates password
              vulnerabilities. Your biometrics never leave your device — only
              cryptographic proofs are sent to our servers.
            </p>
          </div>
          <div className="security-feature">
            <FiCreditCard className="sf-icon" />
            <h4>Payment Security</h4>
            <p>
              Stripe processes all payments with PCI DSS Level 1 compliance.
              Your card details never touch our servers — they are tokenized
              and encrypted end-to-end by Stripe.
            </p>
          </div>
          <div className="security-feature">
            <FiShield className="sf-icon" />
            <h4>Trusted Computing</h4>
            <p>
              Device fingerprinting and trust scoring verify that login
              attempts come from recognized devices. Suspicious activity
              triggers additional verification steps automatically.
            </p>
          </div>
          <div className="security-feature">
            <FiLock className="sf-icon" />
            <h4>Data Protection</h4>
            <p>
              Passwords are hashed with bcrypt (12 salt rounds). All
              communications use HTTPS encryption. SQL injection and XSS
              attacks are prevented through parameterized queries and input
              sanitization.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="about-section about-section-alt">
        <h2 className="section-center-title">Privacy Commitment</h2>
        <div className="privacy-list">
          {[
            'We never sell or share your personal data with third parties',
            'All data is encrypted at rest and in transit',
            'You can request deletion of your account and data at any time',
            'We collect only the minimum data necessary to provide our service',
            'CSRF protection prevents unauthorized actions on your behalf',
            'Rate limiting prevents brute-force attacks on your account',
          ].map((item, i) => (
            <div key={i} className="privacy-item">
              <FiCheckCircle className="privacy-check" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="about-section" id="contact">
        <h2 className="section-center-title">Contact Us</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <FiMail className="contact-icon" />
            <h4>Email</h4>
            <p>support@secureshop.com</p>
          </div>
          <div className="contact-card">
            <FiPhone className="contact-icon" />
            <h4>Phone</h4>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="contact-card">
            <FiMapPin className="contact-icon" />
            <h4>Address</h4>
            <p>123 Secure Street, Digital City</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
