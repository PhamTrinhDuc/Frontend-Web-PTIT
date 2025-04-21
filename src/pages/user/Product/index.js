import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PanigationProduct from '../../../components/PanigationProduct';
import { useParams } from "react-router-dom";
import ProductDetail from '../../../components/ProductDetail';
import Loading from '../../../components/Loading';
import useProductById from '../../../hook/useProductById';
import useAllProduct from '../../../hook/useAllProduct';
import { numPageProductHeader } from '../../../utils/variable';
import './Product.scss';
import ProductRelated from '../../../components/ProductRelated';

function Product() {
  const { id } = useParams();
  const { product, loading, error } = useProductById({ id });
  console.log('product', product);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = numPageProductHeader;
  
  const { products: productsSearch, totalPages } = useAllProduct({ page, pageSize });
  useEffect(() => {
    if (productsSearch) {
      setProducts(productsSearch);
    }
  }, [productsSearch]);

  const handlePaginationChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) return <Loading loading={loading} />;
  // if (error) {
  //   navigate("/error");
  //   return null;
  // }

  return (
    <>
      <ProductDetail product={product.data} />

      <ProductRelated
        products={products}
        pageSize={pageSize}
        totalPages={totalPages}
        currentPage={page}
        loading={loading}
        onPageChange={handlePaginationChange}
      />
    </>
  )
}

export default Product