import {Row, Col} from 'antd';
import { FaShippingFast } from "react-icons/fa";
import { RiCustomerServiceFill } from "react-icons/ri";
import { SiAdguard } from "react-icons/si";
import './Service.scss';

function Service () {
  return (
    <>
      <div className="service-container">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8}>
            <div className="service-card">
              <div className='icon-container'>
                <FaShippingFast className="custom-icon"/>
              </div>
              <h2>FREE AND FAST DELIVERY</h2>
              <p>Free delivery for all orders over $140</p>
            </div>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <div className="service-card">
              <div className='icon-container'>
                <RiCustomerServiceFill className="custom-icon"/>
              </div>
              <h2>24/7 CUSTOMER SERVICE</h2>
              <p>Friendly 24/7 customer support</p>
            </div>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <div className="service-card">
              <div className='icon-container'>
                <SiAdguard className="custom-icon"/>
              </div>
              <h2>MONEY BACK GUARANTEE</h2>
              <p>We reurn money within 30 days</p>
            </div>
          </Col>

        </Row>
      </div>
    </>
  )
}

export default Service;