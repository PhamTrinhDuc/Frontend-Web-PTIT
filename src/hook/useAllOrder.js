import { useState, useEffect } from 'react';
import {get} from '../utils/requests';


const useAllOrder = ({id, currentPage, pageSize}) => {
  console.log(id, currentPage, pageSize)
  const [orders, seOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await get(`orders?id=${id}&page=${currentPage - 1}&size=${pageSize}`);
        console.log(response.data.content)
        seOrders(response.data.content);
      } catch (err) {
        setError(err.message || 'Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  return { orders, loading, error };
};

export default useAllOrder;