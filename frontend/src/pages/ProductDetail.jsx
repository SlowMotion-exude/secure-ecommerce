/**
 * Product Detail Page
 *
 * Full product view with description, reviews, quantity selector,
 * add-to-cart, and trust badges.
 */

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiShield, FiTruck, FiRefreshCw, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { featuredProducts } from '../data/mockData';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const response = await api.get(`/products/${id}`);
        const data = response.data.data;
        if (data && data.name) {
          setProduct(data);
        } else {
          const mock = featuredProducts.find((p) => p.id === Number(id));
          setProduct(mock || null);
        }
      } catch {
        const mock = featuredProducts.find((p) => p.id === Number(id));
        setProduct(mock || null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    setAddingToCart(true);
    try {
      await api.post('/cart/add', { productId: product.id, quantity });
      toast.success(`${product.name} added to cart!`);
    } catch {
      toast.error('Failed to add item to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-loading">
          <div className="loading-spinner" />
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>The product you are looking for does not exist.</p>
          <Link to="/products" className="btn btn-primary">
            <FiArrowLeft /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const stockQty = product.stock_quantity || product.stockQuantity || 50;
  const inStock = stockQty > 0;
  const rating = Number(product.rating);
  const reviewCount = product.review_count || product.reviewCount || 0;

  return (
    <div className="product-detail-page">
      <div className="product-detail-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="product-detail-content">
        <div className="product-detail-image">
          <div
            className="product-detail-placeholder"
            style={{ backgroundColor: product.color || '#6366f1' }}
          >
            <span>{product.name.charAt(0)}</span>
          </div>
          {product.badge && (
            <span className={`product-badge badge-${product.badge.toLowerCase().replace(' ', '-')}`}>
              {product.badge}
            </span>
          )}
        </div>

        <div className="product-detail-info">
          <span className="product-detail-category">
            {product.category || product.category_name}
          </span>
          <h1>{product.name}</h1>

          <div className="product-detail-rating">
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar key={star} className={star <= Math.floor(rating) ? 'star-filled' : 'star-empty'} />
              ))}
            </div>
            <span className="rating-text">{rating} ({reviewCount} reviews)</span>
          </div>

          <div className="product-detail-price">
            <span className="detail-price">${Number(product.price).toFixed(2)}</span>
            {(product.originalPrice || product.original_price) && (
              <span className="detail-original-price">
                ${Number(product.originalPrice || product.original_price).toFixed(2)}
              </span>
            )}
          </div>

          <p className="product-detail-description">
            {product.description || 'Premium quality product with excellent craftsmanship and materials. Designed for both comfort and durability.'}
          </p>

          <div className="product-detail-stock">
            {inStock ? (
              <span className="in-stock">In Stock ({stockQty} available)</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="product-detail-actions">
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <FiMinus />
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(stockQty, quantity + 1))}
                disabled={quantity >= stockQty}
              >
                <FiPlus />
              </button>
            </div>
            <button
              className="btn btn-primary btn-lg btn-add-cart-detail"
              onClick={handleAddToCart}
              disabled={!inStock || addingToCart}
            >
              {addingToCart ? 'Adding...' : <><FiShoppingCart /> Add to Cart</>}
            </button>
          </div>

          <div className="product-detail-trust">
            <div className="trust-item">
              <FiShield /> Secure Payment
            </div>
            <div className="trust-item">
              <FiTruck /> Free Shipping Over $50
            </div>
            <div className="trust-item">
              <FiRefreshCw /> 30-Day Returns
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
