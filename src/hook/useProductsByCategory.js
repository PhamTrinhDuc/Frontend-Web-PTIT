import { useState, useEffect } from 'react';
import {get} from '../utils/requests';


const useProductsByCategory = ({ categorySlug, page, pageSize, priceRange, sortOption }) => {  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    if (!categorySlug) return;

    const params = new URLSearchParams();
    params.append('page', page - 1); // Backend dùng 0-based
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

    // Xử lý sortOption
    if (sortOption) {
      params.append('sortBy', sortOption);
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await get(`products/${categorySlug}?${params.toString()}`);
        console.log('Products response:', response);
        if (!response.status) {
          throw new Error('Failed to fetch products');
        }
        setTotalPages(response.data.totalPages);
        setProducts(response.data.content);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, page, pageSize, priceRange, sortOption]);

  return { products, loading, error, totalPages};
};

export default useProductsByCategory;