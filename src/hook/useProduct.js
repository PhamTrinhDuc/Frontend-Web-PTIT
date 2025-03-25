import { useState, useEffect } from "react";
import { fetchProduct } from "../api/getProduct";


export function useProduct() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProduct();
        setProductList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, []);

  return { productList, loading, error };
}
