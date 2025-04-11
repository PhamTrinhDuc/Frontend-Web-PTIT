import { useState, useEffect } from 'react';
import {get} from '../utils/requests';


const useAllSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchSuppliers = async () => {
      setLoading(true);
      try {
        const response = await get('suppliers');
        setSuppliers(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch suppliers');
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  return { suppliers, loading, error };
};

export default useAllSupplier;