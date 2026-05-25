/**
 * Products Catalog Page
 *
 * Product grid with search, category filtering, and add-to-cart.
 * Fetches from API with fallback to mock data.
 */

import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiSearch, FiStar, FiShoppingCart, FiFilter, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { featuredProducts, categories } from '../data/mockData';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '');
  const [showFilters, setShowFilters] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory) params.category = activeCategory;
        if (searchQuery) params.search = searchQuery;
        const response = await api.get('/products', { params });
        const data = response.data.data;
        setProducts(data.products?.length ? data.products : featuredProducts);
      } catch {
        setProducts(featuredProducts);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [activeCategory, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    setSearchParams(q ? { search: q } : {});
  };

  const handleCategoryClick = (slug) => {
    const next = activeCategory === slug ? '' : slug;
    setActiveCategory(next);
    setSearchParams(next ? { category: next } : {});
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    try {
      await api.post('/cart/add', { productId: product.id, quantity: 1 });
      toast.success(`${product.name} added to cart!`);
    } catch {
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="products-header-content">
          <h1>Our Products</h1>
          <p>Browse our curated collection of secure, quality products</p>
        </div>
        <form className="products-search" onSubmit={handleSearch}>
          <FiSearch className="products-search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button type="button" className="search-clear" onClick={() => { setSearchQuery(''); setSearchParams({}); }}>
              <FiX />
            </button>
          )}
        </form>
      </div>

      <div className="products-layout">
        {/* Sidebar Filters */}
        <aside className={`products-sidebar ${showFilters ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>Categories</h3>
            <button className="sidebar-close" onClick={() => setShowFilters(false)}>
              <FiX />
            </button>
          </div>
          <ul className="category-list">
            <li>
              <button
                className={`category-btn ${!activeCategory ? 'active' : ''}`}
                onClick={() => handleCategoryClick('')}
              >
                All Products
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  className={`category-btn ${activeCategory === cat.slug ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(cat.slug)}
                >
                  {cat.name}
                  <span className="cat-count">{cat.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid */}
        <div className="products-main">
          <div className="products-toolbar">
            <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
              <FiFilter /> Filters
            </button>
            <span className="product-count">{products.length} products</span>
          </div>

          {loading ? (
            <div className="products-loading">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="product-card skeleton" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="products-empty">
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="products-grid catalog-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  {product.badge && (
                    <span className={`product-badge badge-${product.badge.toLowerCase().replace(' ', '-')}`}>
                      {product.badge}
                    </span>
                  )}
                  <Link to={`/products/${product.id}`} className="product-image-link">
                    <div
                      className="product-image-placeholder"
                      style={{ backgroundColor: product.color || '#6366f1' }}
                    >
                      <span className="product-image-text">{product.name.charAt(0)}</span>
                    </div>
                  </Link>
                  <div className="product-card-body">
                    <span className="product-category">{product.category || product.category_name}</span>
                    <Link to={`/products/${product.id}`} className="product-name">
                      {product.name}
                    </Link>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FiStar key={star} className={star <= Math.floor(product.rating) ? 'star-filled' : 'star-empty'} />
                      ))}
                      <span className="rating-value">{product.rating}</span>
                    </div>
                    <span className="review-count">({product.reviewCount || product.review_count} reviews)</span>
                    <div className="product-price-row">
                      <span className="product-price">${Number(product.price).toFixed(2)}</span>
                      {(product.originalPrice || product.original_price) && (
                        <span className="product-original-price">
                          ${Number(product.originalPrice || product.original_price).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      className="btn btn-primary btn-sm btn-add-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FiShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
