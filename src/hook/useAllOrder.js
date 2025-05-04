import { useState, useEffect } from 'react';
import {get} from '../utils/requests';


const useAllOrder = ({currentPage, pageSize}) => {
  const [orders, seOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await get(`orders?page=${currentPage - 1}&size=${pageSize}`);
        setTotalPages(response.data.totalPages);
        seOrders(response.data.content);
      } catch (err) {
        setError(err.message || 'Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  return { orders, loading, error, totalPages};
};

export default useAllOrder;