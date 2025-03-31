import React, { useState } from 'react';
import { Row, Col, Card, Form, Input, InputNumber, Select, Button, Upload, message, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';
import {useCategories} from '../../../hook/useCategories';
import { WatchSpecification, PhoneSpecification } from '../../../components/Specification';
import './AddProduct.scss';
import { useProduct } from '../../../hook/useProduct';

const { Option } = Select;
const { TextArea } = Input;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Thêm state để theo dõi category
  const {categoriesList, loading, error } = useCategories();
  const { productList } = useProduct();
  const navigate = useNavigate();

  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate("/error");
    return null;
  }

  const handleCategoryChange = (value) => {
    setSelectedCategory(value); // Cập nhật category khi người dùng chọn
  };

  const handleDiscard = () => {
    form.resetFields(); // Xóa toàn bộ dữ liệu trong form
  };

  // Xử lý upload ảnh
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Xử lý chọn tags
  const handleTagChange = (value) => {
    setSelectedProduct(value);
  };

  // Xử lý submit form
  const onFinish = (values) => {
    const productData = {
      ...values,
      images: fileList,
      product: selectedProduct,
    };
    // Gửi dữ liệu lên API (ở đây chỉ log ra để kiểm tra)
    console.log('Product Data:', productData);
    message.success('Product added successfully!');
    form.resetFields();
    setFileList([]);
    setSelectedProduct([]);
  };

  return (
    <div className="add-product">
      <div className="header">
        <h1>Add Product</h1>
        <Space>
          <Button danger onClick={handleDiscard}>Discard Changes</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Add Product
          </Button>
        </Space>
      </div>
  
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          {/* Cột chính bên trái: General Information, Pricing, Inventory */}
          <Col xs={24} md={16}>
            {/* General Information */}
            <Card title="General Information">
              <Form.Item
                label="Product Variant Name"
                name="productVariantName"
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
  
            {/* Pricing & Inventory trên cùng một dòng */}
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col xs={24} md={12}>
                <Card title="Pricing" className="pricing">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Base Price"
                        name="price"
                        rules={[{ required: true, message: 'Please enter base price' }]}
                      >
                        <InputNumber
                          min={0}
                          formatter={(value) => `$ ${value}`}
                          parser={(value) => value.replace('$ ', '')}
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Discount Percentage (%)" name="discount">
                        <InputNumber min={0} max={100} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card title="Inventory">
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <Form.Item label="Quantity" name="quantity_stock">
                        <InputNumber
                          min={0}
                          placeholder="Type product quantity"
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
  
            {/* Specification (hiển thị dựa trên category) */}
            {selectedCategory && (
              <Card title="Specification" style={{ marginTop: 16 }}>
                {selectedCategory === 'smart-watches' && <WatchSpecification />}
                {selectedCategory === 'phone' && <PhoneSpecification />}
              </Card>
            )}
          </Col>
  
          {/* Cột bên phải: Product Media & Category */}
          <Col xs={24} md={8}>
            {/* Product Media */}
            <Card title="Product Media" className="product-media-card">
              <Form.Item label="">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false}
                />
                {fileList.length < 5 && (
                  <Button
                    type="primary"
                    icon={<UploadOutlined />}
                    onClick={() => document.querySelector(".ant-upload input").click()}
                  >
                    Add More Image
                  </Button>
                )}
              </Form.Item>
            </Card>
  
            {/* Category */}
            <Card title="Category" style={{ marginTop: 16 }}>
              <Form.Item label="Product Category" name="category">
                <Select
                  placeholder="Select a category"
                  onChange={handleCategoryChange}
                >
                  {categoriesList.map((category) => (
                    <Option key={category.id} value={category.slug}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Representative Products" name="tags">
                <Select
                  // mode="multiple"
                  value={selectedProduct}
                  onChange={handleTagChange}
                  placeholder="Select products"
                >
                  {productList.map((product) => (
                    <Option key={product.id} value={product.description}>
                      {product.description}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Button type="primary" style={{ width: '100%' }}>
                Select Tags
              </Button>
            </Card>

            <Card title="Supplier" style={{ marginTop: 16 }}>
              <Form.Item label="Supplier" name="supplier">
                <Select placeholder="Select supplier">
                  <Option value="Apple">Apple</Option>
                  <Option value="Google">Google</Option>
                </Select>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  )
};

export default AddProduct;