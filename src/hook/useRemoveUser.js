import { useState, useEffect } from 'react';
import {get} from '../utils/requests';
import { useSelector } from 'react-redux';


const useRemoveUser = ({id}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await remove(`users/me/${id}`, token);
        setUsers(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useRemoveUser;