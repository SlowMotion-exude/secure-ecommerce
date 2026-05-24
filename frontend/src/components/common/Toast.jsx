/**
 * Toast Notification Wrapper
 *
 * Re-exports react-hot-toast with preconfigured styling.
 * Centralizes toast configuration for consistent notifications.
 */

import { Toaster } from 'react-hot-toast';

function ToastContainer() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1e293b',
          color: '#f8fafc',
          fontSize: '0.9rem',
          borderRadius: '0.5rem',
          padding: '12px 16px',
        },
        success: {
          iconTheme: { primary: '#22c55e', secondary: '#f8fafc' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#f8fafc' },
        },
      }}
    />
  );
}

export default ToastContainer;
