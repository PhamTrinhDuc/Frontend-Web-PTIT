import { useState, useEffect } from 'react';
import {get} from '../utils/requests';


const useProductsByCategory = ({ categorySlug, page, pageSize, priceRange, sortOption }) => {  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page - 1);
      params.append('size', pageSize);
    
      if (priceRange) {
        if (priceRange === '>2000') {
          params.append('minPrice', 2000);
        } else {
          const [min, max] = priceRange.split('-').map(Number);
          params.append('minPrice', min);
          params.append('maxPrice', max);
        }
      }

      if (sortOption) {
        params.append('sortBy', sortOption);
      }

      const url = categorySlug ? `products/${categorySlug}?${params.toString()}` : `products?${params.toString()}`;
      const response = await get(url);
      
      if (response && response.status) {
        setTotalPages(response.data.totalPages);
        setProducts(response.data.content);
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categorySlug, page, pageSize, priceRange, sortOption]);

  return { products, loading, error, totalPages, refreshProduct: fetchProducts };
};

export default useProductsByCategory;