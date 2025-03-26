import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import {get} from '../utils/requests';


const useProductVariantById = ({id}) => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await get(`product_variant/id/${id}`);
        setProduct(data);
      } catch (error) {
        setError(error.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

export default useProductVariantById;