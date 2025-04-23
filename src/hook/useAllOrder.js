import { useState, useEffect } from 'react';
import {get} from '../utils/requests';


const useAllOrder = ({id, page, pageSize}) => {
  const [orders, seOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("page: ", page)
  console.log("pageSize: ", pageSize)

  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await get(`orders?id=${id}&page=${page - 1}&size=${pageSize}`);
        seOrders(response.data.content);
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