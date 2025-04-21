import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import ProductDetail from '../../../components/ProductDetail';
import ProductRelated from '../../../components/ProductRelated';
import Loading from '../../../components/Loading';
import useProductById from '../../../hook/useProductById';
import useAllProduct from '../../../hook/useAllProduct';
import { numPageProduct } from '../../../utils/variable';
import './Product.scss';

function Product() {
  const { id } = useParams();
  const { product, loading, error } = useProductById({ id });
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = numPageProduct;
  const { products: defaultProducts } = useAllProduct({
    page,
    pageSize,
  });

  const handlePaginationChange = (newPage, newPageSize) => {
    setSearchParams({ page: newPage.toString(), pageSize: newPageSize.toString() });
  };

  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate("/error");
    return null;
  }

  return (
    <>
      <ProductDetail product={product.data} />

      <ProductRelated 
        products={defaultProducts}
        numOfProduct={pageSize}
        onPaginationChange={handlePaginationChange} />
    </>
  )
}

export default Product