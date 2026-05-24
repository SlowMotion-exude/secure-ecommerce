/**
 * Root Application Component
 *
 * Sets up React Router, global layout, and toast notifications.
 * Routes are organized by access level: public, protected, admin.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/common/Toast';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />

              {/* Auth Routes (upcoming) */}
              {/* <Route path="/login" element={<Login />} /> */}
              {/* <Route path="/register" element={<Register />} /> */}
              {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

              {/* Product Routes (upcoming) */}
              {/* <Route path="/products" element={<Products />} /> */}
              {/* <Route path="/products/:id" element={<ProductDetail />} /> */}

              {/* Protected Customer Routes (upcoming) */}
              {/* <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} /> */}
              {/* <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} /> */}
              {/* <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} /> */}
              {/* <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} /> */}
              {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}

              {/* Trust/Policy Pages (upcoming) */}
              {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
              {/* <Route path="/security" element={<SecurityInfo />} /> */}

              {/* Admin Routes (upcoming) */}
              {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
              {/* <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} /> */}
              {/* <Route path="/admin/products" element={<AdminRoute><ProductManagement /></AdminRoute>} /> */}
              {/* <Route path="/admin/orders" element={<AdminRoute><OrderManagement /></AdminRoute>} /> */}
              {/* <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} /> */}
              {/* <Route path="/admin/audit" element={<AdminRoute><AuditLogs /></AdminRoute>} /> */}

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
