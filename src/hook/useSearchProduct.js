import { useState, useEffect } from 'react';
import {get} from '../utils/requests';


const useSearchProduct = ({page, pageSize, keyword, priceRange, sortOption}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const params = new URLSearchParams();
        params.append('keyword', keyword);
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
        // Xử lý sortOption
        if (sortOption) {
          params.append('sortBy', sortOption);
        }
      try {
        const response = await get(`products/search?${params.toString()}`);
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
  }, [page, pageSize, keyword, priceRange, sortOption]); 
  return { products, loading, error, totalPages };
};

export default useSearchProduct;