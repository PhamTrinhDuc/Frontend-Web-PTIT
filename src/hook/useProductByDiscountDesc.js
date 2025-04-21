import { useState, useEffect } from 'react';
import {get} from '../utils/requests';


const useProductByDiscountDesc = ({page, pageSize}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await get(`products/filter/by-discount?page=${page-1}&size=${pageSize}`);
        setTotalPages(response.data.totalPages);
        setProducts(response.data.content);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, pageSize]);

  return { products, loading, error, totalPages };
};

export default useProductByDiscountDesc;