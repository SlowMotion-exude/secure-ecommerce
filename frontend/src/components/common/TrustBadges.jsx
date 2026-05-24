/**
 * Trust Badges Component
 *
 * Displays security and trust indicators to build customer confidence.
 * Part of the TAM (Technology Acceptance Model) implementation.
 */

import { FiShield, FiLock, FiCreditCard, FiCheck } from 'react-icons/fi';

function TrustBadges({ variant = 'horizontal' }) {
  const badges = [
    { icon: <FiLock />, label: 'SSL Secured', detail: '256-bit encryption' },
    { icon: <FiCreditCard />, label: 'PCI Compliant', detail: 'Secure payments' },
    { icon: <FiShield />, label: 'FIDO2 Certified', detail: 'Biometric auth' },
    { icon: <FiCheck />, label: 'Verified Platform', detail: 'Trusted computing' },
  ];

  return (
    <div className={`trust-badges-container trust-badges-${variant}`}>
      {badges.map((badge, index) => (
        <div key={index} className="trust-badge-item">
          <span className="trust-badge-icon">{badge.icon}</span>
          <div className="trust-badge-text">
            <span className="trust-badge-label">{badge.label}</span>
            <span className="trust-badge-detail">{badge.detail}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrustBadges;
