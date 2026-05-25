/**
 * Why Shop With Us Section
 *
 * Highlights the platform's security features and trust advantages.
 * Addresses TAM (Technology Acceptance Model) perceived usefulness.
 */

import { FiShield, FiCreditCard, FiSmartphone, FiLock, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const features = [
  {
    icon: <FiSmartphone />,
    title: 'Biometric Security',
    description: 'Login with your fingerprint using the WebAuthn/FIDO2 standard. No more remembering complex passwords — your biometrics are your key.',
    color: '#3b82f6',
  },
  {
    icon: <FiCreditCard />,
    title: 'Secure Payments',
    description: 'PCI DSS compliant payment processing powered by Stripe. Your card details never touch our servers — they are encrypted end-to-end.',
    color: '#10b981',
  },
  {
    icon: <FiShield />,
    title: 'Trusted Computing',
    description: 'Advanced device verification and trust scoring protect your account. We detect and flag suspicious login attempts automatically.',
    color: '#8b5cf6',
  },
  {
    icon: <FiLock />,
    title: 'Data Protection',
    description: 'Industry-standard bcrypt password hashing with 12 salt rounds. All sensitive data is encrypted at rest and in transit.',
    color: '#f59e0b',
  },
  {
    icon: <FiCheckCircle />,
    title: 'Input Validation',
    description: 'Every user input is validated and sanitized to prevent SQL injection and XSS attacks. Your data integrity is guaranteed.',
    color: '#ec4899',
  },
  {
    icon: <FiAlertTriangle />,
    title: 'Rate Limiting',
    description: 'Intelligent rate limiting protects against brute-force attacks. Your account stays safe even under sophisticated attack attempts.',
    color: '#14b8a6',
  },
];

function WhyShopWithUs() {
  return (
    <section className="why-section">
      <div className="section-header">
        <h2>Why Shop With Us</h2>
        <p className="section-subtitle">
          Your security is our top priority. Every feature is designed to protect you.
        </p>
      </div>
      <div className="why-grid">
        {features.map((feature, index) => (
          <div key={index} className="why-card">
            <div className="why-icon" style={{ color: feature.color, backgroundColor: `${feature.color}15` }}>
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyShopWithUs;
