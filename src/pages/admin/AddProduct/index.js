import React, { useState } from 'react';
import { Row, Col, Card, Form, Input, InputNumber, Select, Button, Upload, message, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';
import {useCategories} from '../../../hook/useCategories';
import './AddProduct.scss';

const { Option } = Select;
const { TextArea } = Input;



const AddProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [selectedTags, setSelectedTags] = useState(['Internet of Things']);
  const { categoriesList, loading, error } = useCategories();
  const navigate = useNavigate();

  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate("/error");
    return null;
  }


  // Xử lý upload ảnh
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Xử lý chọn tags
  const handleTagChange = (value) => {
    setSelectedTags(value);
  };

  // Xử lý submit form
  const onFinish = (values) => {
    const productData = {
      ...values,
      images: fileList,
      tags: selectedTags,
    };
    // Gửi dữ liệu lên API (ở đây chỉ log ra để kiểm tra)
    console.log('Product Data:', productData);
    message.success('Product added successfully!');
    form.resetFields();
    setFileList([]);
    setSelectedTags([]);
  };

  return (
    <div className="add-product">
      <div className="header">
        <h1>Add Product</h1>
        <Space>
          <Button danger>Discard Changes</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Add Product
          </Button>
        </Space>
      </div>

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          {/* General Information */}
          <Col xs={24} md={16}>
            <Card title="General Information">
              <Form.Item
                label="Product Name"
                name="productName"
                rules={[{ required: true, message: 'Please enter product name' }]}
              >
                <Input placeholder="Xiaomi Watch 2 Pro" />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter description' }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Xiaomi Watch 2 Pro supports 19 professional fitness modes..."
                />
              </Form.Item>
            </Card>

            {/* Pricing */}
            <Card title="Pricing" className="pricing">
              <Row gutter={16} className="pricing-row">
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Base Price"
                    name="basePrice"
                    rules={[{ required: true, message: 'Please enter base price' }]}
                  >
                    <InputNumber
                      min={0}
                      formatter={(value) => `$ ${value}`}
                      parser={(value) => value.replace('$ ', '')}
                      style={{ width: '100%' }} // Đảm bảo input full width trong Col
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Discount Percentage (%)" name="discountPercentage">
                    <InputNumber
                      min={0}
                      max={100}
                      style={{ width: '100%' }} // Đảm bảo input full width trong Col
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Discount Type" name="discountType">
                    <Select placeholder="Select a discount type" style={{ width: '100%' }}>
                      <Option value="percentage">Percentage</Option>
                      <Option value="fixed">Fixed Amount</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Inventory */}
            <Card title="Inventory" style={{ marginTop: 16 }}>
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item label="SKU" name="sku">
                    <Input placeholder="113902" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Barcode" name="barcode">
                    <Input placeholder="0324298012" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Quantity" name="quantity">
                    <Input placeholder="Type product quantity" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Product Media & Category */}
          <Col xs={24} md={8}>
            <Card title="Product Media" className="product-media-card">
              <Form.Item label="">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false} // Không upload ngay, chỉ chọn file
                />
                {/* Đưa nút ra bên dưới Upload */}
                {fileList.length < 5 && (
                  <Button
                  type='primary'
                    icon={<UploadOutlined />}
                    onClick={() => document.querySelector(".ant-upload input").click()}
                  >
                    Add More Image
                  </Button>
                )}
              </Form.Item>
            </Card>


            <Card title="Category" style={{ marginTop: 16 }}>
              <Form.Item label="Product Category" name="category">
                <Select placeholder="Select a category">
                  {categoriesList.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Product Tags" name="tags">
                <Select
                  mode="multiple"
                  value={selectedTags}
                  onChange={handleTagChange}
                  placeholder="Select tags"
                >
                  <Option value="Clothing">Clothing</Option>
                  <Option value="Toys">Toys</Option>
                  <Option value="Internet of Things">Internet of Things</Option>
                  <Option value="Books & Stationery">Books & Stationery</Option>
                  <Option value="Art Supplies">Art Supplies</Option>
                </Select>
              </Form.Item>
              <Button type="primary" style={{ width: '100%' }}>
                Select Tags
              </Button>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddProduct;