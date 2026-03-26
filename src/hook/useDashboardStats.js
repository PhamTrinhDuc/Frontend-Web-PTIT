import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { get } from '../utils/requests';

const useDashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await get('admin/dashboard/overview', token);
      if (response && response.status) {
        setStats(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  return { stats, loading, error, refresh: fetchStats };
};

export default useDashboardStats;
