import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {get} from '../utils/requests';


const useTopOrder = () => {
  const [orders, seOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await get('users/top-spending', token);
        seOrders(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { orders, loading, error};
};

export default useTopOrder;