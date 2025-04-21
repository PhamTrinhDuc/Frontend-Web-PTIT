import { useState, useEffect } from 'react';
import {get} from '../utils/requests';


const useSearchProduct = ({page, pageSize, keyword}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {

        // const url = keyword
        //   ? `products/search?keyword=${keyword}&page=${page - 1}&size=${pageSize}`
        //   : `products?page=${page - 1}&size=${pageSize}`; // fallback API nếu không search
        const response = await get(`products/search?keyword=${keyword}&page=${page - 1}&size=${pageSize}`);
        if (!response.status) {
          throw new Error('Failed to fetch products');
        }
        setTotalPages(response.data.totalPages);
        setProducts(response.data.content);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, pageSize, keyword]); 
  return { products, loading, error, totalPages };
};

export default useSearchProduct;