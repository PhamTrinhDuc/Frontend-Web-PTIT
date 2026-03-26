import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {get} from '../utils/requests';


const useAllOrderByUserId = ({currentPage, pageSize}) => {
  const [orders, seOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!isLoggedIn || !user) return;
      setLoading(true);
      try {
        const response = await get(`orders/by-id/${user.id}?page=${currentPage - 1}&size=${pageSize}`, token);
        console.log("response", response);
        setTotalPages(response?.data?.totalPages || 0);
        seOrders(response?.data?.content || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, token, pageSize, user?.id, isLoggedIn]);

  return { orders, loading, error, totalPages};
};

export default useAllOrderByUserId;