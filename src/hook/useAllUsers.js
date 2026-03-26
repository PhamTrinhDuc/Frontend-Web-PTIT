import { useState, useEffect } from 'react';
import {get} from '../utils/requests';
import { useSelector } from 'react-redux';


const useAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await get('users', token);
      setUsers(response);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return { users, loading, error, fetchUsers };
};

export default useAllUsers;