import { Button } from "antd";
import { Col, Row } from "antd";
import { TbRectangleVerticalFilled } from "react-icons/tb";
import PanigationProduct from "../PanigationProduct";
import CardProduct from "../CardProduct";
import './BestSelling.scss';



function BestSellingBanner({products}) {


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

      <PanigationProduct products={products} numOfProduct={4} />
    </div>
  );
}

export default BestSellingBanner;