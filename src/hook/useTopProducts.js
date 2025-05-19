import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {get} from '../utils/requests';


const useTopProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await get('products/top-selling-products', token);
        console.log('response', response);
        setProducts(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, loading, error};
};

export default useTopProducts;