import { useState, useEffect } from 'react';
import {get} from '../utils/requests';


const useProductsByCategory = ({categorySlug, page, pageSize}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    if (!categorySlug) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await get(`products/${categorySlug}?page=${page - 1}&size=${pageSize}`);
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
  }, [categorySlug, page, pageSize]);

  return { products, loading, error, totalPages};
};

export default useProductsByCategory;