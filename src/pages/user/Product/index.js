import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ProductDetail from '../../../components/ProductDetail';
import ProductRelated from '../../../components/ProductRelated';
import Loading from '../../../components/Loading';
import products from '../../../utils/mock_data';
import useProductById from '../../../hook/useProductById';
import useAllProduct from '../../../hook/useAllProduct';
import './Product.scss';

function Product() {
  const { id } = useParams();
  const { product, loading, error } = useProductById({ id });
  const { products } = useAllProduct(); 
  const navigate = useNavigate();

  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate("/error");
    return null;
  }

  return (
    <>
      <ProductDetail product={product.data} />

      <ProductRelated products={products.slice(0, 20)} />
    </>
  )
}

export default Product