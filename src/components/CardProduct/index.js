import {Row, Col, Card, Badge, Rate} from 'antd';
import { Typography } from 'antd';
import { HeartOutlined, EyeOutlined } from '@ant-design/icons';
import './Card.scss';


const { Text } = Typography;

function CardProduct(props) {
  const { product } = props;
  
  return (
    <>
      <div className="card-container">
        <Card 
          className="card-image"
          cover={
            <div className="product-image-container">
              <Badge.Ribbon text={`-${product.discount} %`} color="#DB4444" className="sale-badge">
                <img src={product.image} alt={product.name} className="product-image" />
              </Badge.Ribbon>
            </div>
          }
          actions={[
            <HeartOutlined key="heart" className="product-action-icon" />,
            <EyeOutlined key="view" className="product-action-icon" />
          ]}
        >
        </Card>
        <div className='card-content'>
          <h3 className='product-title'>{product.name}</h3>
          <div className='product-price'>
            <Text className='original-price'>{product.originalPrice}</Text>
            <Text className='sale-price'>{product.salePrice }</Text>
          </div>
          <div className='product-rating'>
            <Rate disabled defaultValue={product.rating} />
            <Text className='review-count'>({product.reviews})</Text>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardProduct;