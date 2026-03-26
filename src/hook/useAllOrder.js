import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {get} from '../utils/requests';


const useAllOrder = ({currentPage, pageSize}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const token = useSelector((state) => state.auth.token);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await get(`orders?page=${currentPage - 1}&size=${pageSize}`, token);
      if (response && response.status) {
        setTotalPages(response.data.totalPages);
        setOrders(response.data.content);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, token, pageSize]);

  return { orders, loading, error, totalPages, fetchOrders };
};

export default useAllOrder;