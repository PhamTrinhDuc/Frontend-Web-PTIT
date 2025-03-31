import React from 'react'; 
import { Row, Col, Form, Input } from 'antd';
import { useSelector } from 'react-redux';


export const WatchSpecification = () => (
  <Row gutter={16}>
    <Col xs={24} md={8}>
      <Form.Item label="Screen Size" name="screenSize">
        <Input placeholder="Type screen size" />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Battery Capacity" name="batteryCapacity">
        <Input placeholder="Type battery capacity" />
      </Form.Item>
    </Col>
  </Row>
);

export const PhoneSpecification = () => (
  <Row gutter={16}>
    <Col xs={24} md={8}>
      <Form.Item label="RAM" name="ram">
        <Input placeholder="Type RAM" />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Storage" name="storage">
        <Input placeholder="Type storage" />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Color" name="Color">
        <Input placeholder="Type colors" />
      </Form.Item>
    </Col>
  </Row>
);
