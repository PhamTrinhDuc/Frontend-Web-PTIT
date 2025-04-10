import React, { useState } from 'react';
import { Row, Col, Card, Form, Input, InputNumber, Select, Button, Upload, message, Space, Modal } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
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
  const [categoryForm] = Form.useForm(); // Form cho modal thêm category
  const [fileList, setFileList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // State cho modal
  const {categoriesList, loading, error } = useCategories();
  const { productList } = useProduct();
  const navigate = useNavigate();

  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate("/error");
    return null;
  }

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleDiscard = () => {
    form.resetFields();
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleTagChange = (value) => {
    setSelectedProduct(value);
  };

  const onFinish = (values) => {
    const productData = {
      ...values,
      images: fileList,
      product: selectedProduct,
    };
    console.log('Product Data:', productData);
    message.success('Product added successfully!');
    form.resetFields();
    setFileList([]);
    setSelectedProduct([]);
  };

  // Xử lý thêm category
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAddCategory = () => {
    categoryForm.validateFields().then((values) => {
      // Ở đây bạn có thể thêm logic để gửi category mới lên API
      console.log('New Category:', values);
      message.success('Category added successfully!');
      categoryForm.resetFields();
      setIsModalVisible(false);
      // Có thể thêm logic để cập nhật categoriesList tại đây
    }).catch((error) => {
      console.log('Validation failed:', error);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    categoryForm.resetFields();
  };

  return (
    <>
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
            <Col xs={24} md={16}>
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
                  <TextArea rows={4} placeholder="Xiaomi Watch 2 Pro supports 19 professional fitness modes..." />
                </Form.Item>
              </Card>
    
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
                          <InputNumber min={0} placeholder="Type product quantity" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
    
              {selectedCategory && (
                <Card title="Specification" style={{ marginTop: 16 }}>
                  {selectedCategory === 'smart-watches' && <WatchSpecification />}
                  {selectedCategory === 'phone' && <PhoneSpecification />}
                </Card>
              )}
            </Col>
    
            <Col xs={24} md={8}>
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
    
              <Card title="Category" style={{ marginTop: 16 }}>
                <Form.Item label="Product Category" name="category">
                  <Select
                    placeholder="Select a category"
                    onChange={handleCategoryChange}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <div style={{ padding: 8 }}>
                          <Button
                            type="dashed"
                            onClick={showModal}
                            icon={<PlusOutlined />}
                            style={{ width: '100%' }}
                          >
                            Add New Category
                          </Button>
                        </div>
                      </>
                    )}
                  >
                    {categoriesList.map((category) => (
                      <Option key={category.id} value={category.slug}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
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

        {/* Modal để thêm category mới */}
        <Modal
          title="Add New Category"
          visible={isModalVisible}
          onOk={handleAddCategory}
          onCancel={handleCancel}
        >
          <Form form={categoryForm} layout="vertical">
            <Form.Item
              label="Category Name"
              name="categoryName"
              rules={[{ required: true, message: 'Please enter category name' }]}
            >
              <Input placeholder="Enter category name" />
            </Form.Item>
            <Form.Item
              label="Category Slug"
              name="categorySlug"
              rules={[{ required: false, message: 'Please enter category slug' }]}
            >
              <Input placeholder="Enter category slug" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default AddProduct;