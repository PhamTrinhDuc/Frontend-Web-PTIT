import { Card, Col, Image, Row } from 'antd'
import './Product.scss';
import ProductDetail from '../../../components/ProductDetail';
import ProductRelated from '../../../components/ProductRelated';
import products from '../../../utils/mock_data';


const product = {
  name: 'Havic HV-G92 Gamepad',
  price: 2300000,
  images: [
    'https://product.hstatic.net/1000129940/product/tay-cam-choi-game-hp-hyperx-clutch-gladiate_70246be57ab640ce8ec0da561325c20c_master.jpg',
    'https://product.hstatic.net/1000129940/product/tay-cam-choi-game-hp-hyperx-clutch-gladiate-1_b8b3cb6338744223aed921f0c83c7506_master.jpg',
    'https://product.hstatic.net/1000129940/product/tay-cam-choi-game-hp-hyperx-clutch-gladiate-2_db4b63cde9a94228a589d9541f68f14b_master.jpg',
    'https://product.hstatic.net/1000129940/product/tay-cam-choi-game-hp-hyperx-clutch-gladiate-3_9f6a1efeedde43fe93eb1c0d269fc31d_medium.jpg',
    'https://product.hstatic.net/1000129940/product/tay-cam-choi-game-hp-hyperx-clutch-gladiate-3_9f6a1efeedde43fe93eb1c0d269fc31d_medium.jpg',
  ],
  description: 'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
  colors: ['White', 'Black', 'Red'],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  inStock: 10,
  reviews: 150,
  rating: 4.5,
};

function Product() {

  return (
    <>
      <ProductDetail product={product} />

      <ProductRelated products={products}/>
    </>
  )
}

export default Product