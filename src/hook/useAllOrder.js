import { useState, useEffect } from 'react';
import {get} from '../utils/requests';


const useAllOrder = ({id}) => {
  const [orders, seOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await get(`orders?id=${id}`);
        seOrders(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { orders, loading, error };
};

export default useAllOrder;