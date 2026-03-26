import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { get } from '../utils/requests';

const useMonthlyRevenue = (year = new Date().getFullYear()) => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const fetchRevenue = async () => {
    if (!token) return; // Prevent 403 fetch before Redux hydrates
    setLoading(true);
    try {
      const response = await get(`admin/dashboard/revenue/monthly?year=${year}`, token);
      if (response && response.status) {
        // Chuyển đổi dữ liệu từ {"1": 1000, "2": 2000} thành array [1000, 2000]
        const dataArray = Object.values(response.data);
        setRevenueData(dataArray);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch revenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, [token, year]);

  return { revenueData, loading, error, refresh: fetchRevenue };
};

export default useMonthlyRevenue;
