import { useState, useEffect } from 'react';
import {get} from '../utils/requests';


const useProductsByCategory = (categorySlug) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categorySlug) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await get(`product_variant/${categorySlug}`);
        setProducts(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  return { products, loading, error };
};

export default useProductsByCategory;