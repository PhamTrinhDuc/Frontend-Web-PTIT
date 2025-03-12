import { Button } from "antd";
import { Col, Row } from "antd";
import { TbRectangleVerticalFilled } from "react-icons/tb";
import CardProduct from "../CardProduct";
import './BestSelling.scss';



function BestSellingBanner() {
  const products = [
    {
      id: 1,
      name: 'Toy clm chiil game HY-G93',
      originalPrice: '$168.00',
      salePrice: '$120.00',
      rating: 5,
      reviews: 74,
      discount: 5,
      image: 'https://www.shutterstock.com/image-photo/antalya-turkey-september-14-2023-260nw-2361564459.jpg',
    },
    {
      id: 2,
      name: 'San palnt AK-900 Wired',
      originalPrice: '$160.00',
      salePrice: '$60.00',
      rating: 5,
      reviews: 78,
      discount: 10,
      image: 'https://www.shutterstock.com/image-photo/antalya-turkey-september-14-2023-260nw-2361564459.jpg',
    },
    {
      id: 3,
      name: 'Toy clm chiil game HY-G93',
      originalPrice: '$168.00',
      salePrice: '$120.00',
      rating: 5,
      reviews: 90,
      discount: 12,
      image: 'https://www.shutterstock.com/image-photo/antalya-turkey-september-14-2023-260nw-2361564459.jpg',
    },
    {
      id: 4,
      name: 'Toy clm chiil game HY-G93',
      originalPrice: '$168.00',
      salePrice: '$120.00',
      rating: 5,
      reviews: 74,
      discount: 5,
      image: 'https://www.shutterstock.com/image-photo/antalya-turkey-september-14-2023-260nw-2361564459.jpg',
    }
  ];

  return (
    <div className="best-selling-container">
      <div className="best-selling-container__title"> 
        <TbRectangleVerticalFilled className="icon"/>
        <h1>This month</h1>
      </div>

      <div className="best-selling-container__content">
        <h2>Best Selling Products</h2>
        <Button type="dashed" className="view-all" shape='round' href='/products'>
          View All
        </Button>
      </div>

      <Row gutter={[16, 16]} justify='center'>
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <CardProduct product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default BestSellingBanner;