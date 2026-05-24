/**
 * Root Application Component
 *
 * Sets up the React Router and global layout (Navbar + Footer).
 * Protected routes are wrapped with ProtectedRoute component.
 * Additional routes will be added in subsequent phases.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />

              {/* Phase 4: Auth routes */}
              {/* <Route path="/login" element={<Login />} /> */}
              {/* <Route path="/register" element={<Register />} /> */}

              {/* Phase 6: Product routes */}
              {/* <Route path="/products" element={<Products />} /> */}
              {/* <Route path="/products/:id" element={<ProductDetail />} /> */}

              {/* Phase 6: Protected cart route */}
              {/* <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} /> */}

              {/* Phase 7: Protected checkout route */}
              {/* <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} /> */}

              {/* Phase 10: Trust/Policy pages */}
              {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}

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
