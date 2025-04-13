import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSetion from '../../../components/FilterCommon';
import CategoriesHeader from '../../../components/CategoriesHeader';
import ShowProduct from '../../../components/ShowProduct';
import Loading from '../../../components/Loading';
import { get } from '../../../utils/requests';
import './AllProduct.scss';

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const keyword = searchParams.get('search') || '';
        const response = await get(`products/search?keyword=${keyword}`);
        if (response && response.status) {
          setProducts(response.data || []);
        } else {
          throw new Error('Không tìm thấy sản phẩm');
        }
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const handleProductsChange = (newProducts) => {
    if (newProducts && newProducts.length >= 0) {
      setProducts(newProducts);
    }
  };

  if (loading) return <Loading loading={loading} />;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <>
      <div className="products-container">
        <CategoriesHeader />
        <FilterSetion onProductsChange={handleProductsChange} />
        <ShowProduct products={products} />
        <div className="product-container"></div>
      </div>
    </>
  );
}

export default AllProduct;