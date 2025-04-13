import React, { useState } from 'react';
import { Row, Col, Card, Form, Input, InputNumber, Select, Button, Upload, message, Space, Modal } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Loading from '../../../components/Loading';
import {useCategories} from '../../../hook/useCategories';
import useAllSupplier from '../../../hook/useAllSupplier';
import { WatchSpecification, PhoneSpecification } from '../../../components/Specification';
import { post, get } from '../../../utils/requests';
import useProductById from '../../../hook/useProductById';
import './EditProduct.scss';

const { Option } = Select;
const { TextArea } = Input;

const EditProduct = () => {
  const [form] = Form.useForm();
  const [categoryForm] = Form.useForm(); // Form cho modal thêm category
  const [fileList, setFileList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // State cho modal
  const [loading, setLoading] = useState(false);
  const {categoriesList, loading: categoriesLoading, error } = useCategories();
  const {suppliers}  = useAllSupplier();
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams(); 
  const { product: productResponse } = useProductById({ id });
  const product = productResponse?.data;

  console.log("Product data:", product);

  if (categoriesLoading) return <Loading loading={categoriesLoading} />;
  if (error) {
    navigate("/error");
    return null;
  }

  const handleUpload = async ({ file, onSuccess, onError }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/api/upload/image", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Upload failed: " + res.statusText);
      }
  
      const responseData = await res.text(); // Lấy URL ảnh từ response
      let imageUrl = responseData.data;
      if (responseData.includes('{') || responseData.includes('[')) {
        // Có thể response là JSON
        try {
          const jsonData = JSON.parse(responseData);
          imageUrl = jsonData.url || jsonData.path || jsonData.imageUrl || jsonData.data || responseData;
        } catch (e) {
          console.log("Error parsing JSON response:", e);
        }
      }
      
      setImageUrls(prev => [...prev, imageUrl]);
      onSuccess("ok");
      message.success(`${file.name} uploaded successfully`);
    } catch (err) {
      console.error("Upload error:", err);
      onError(err);
      message.error(`${file.name} upload failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  // Hàm xử lý xóa ảnh
  const handleRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.filter((_, i) => i !== index);
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    
    setFileList(newFileList);
    setImageUrls(newImageUrls);
    // Có thể gọi API để xóa ảnh từ server nếu cần
    return true;
  };
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(0, 5));
  };
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };
  const handleDiscard = () => {
    form.resetFields();
    setFileList([]);
    setImageUrls([]);
  };

  const onFinish = async (values) => {
    if (imageUrls.length === 0) {
      message.warning("Please upload at least one product image.");
      return;
    }
    setLoading(true);
    const productData = {
      ...values,
      imagePaths: imageUrls || product.imagePaths,
    };
    console.log("Product data to be sent:", productData);
    
    try {
      const response = await post("products/update-product", productData);
      if (!response) {
        throw new Error("Failed to add product");
      }
    } catch (err) {
      console.error("Error adding product:", err);
    } finally {
      form.resetFields();
      setFileList([]);
      setImageUrls([]);
      navigate('/products');
      setLoading(false);
    }
  };

  return (
    <>
      <div className="add-product">
        <div className="header">
          <h1>Update Product</h1>
          <Space>
            <Button danger onClick={handleDiscard} disabled={loading}>Discard Changes</Button>
            <Button type="primary" onClick={() => form.submit()} loading={loading}>
              Update Product
            </Button>
          </Space>
        </div>

        <Form form={form} 
        onFinish={onFinish} 
        layout="vertical"
        initialValues={{
          productName: product.name,
          description: product.description,
          price: product.price,
          discount: product.discount,
          quantityStock: product.quantityStock,
          // category: product.categoryId,
          // supplier: product.supplier,
          specification: product.specification,
          imagePaths: product.imagePaths,
        }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={16}>
              <Card title="General Information">
                <Form.Item
                  label="Product Name"
                  name="productName"
                  rules={[{message: 'Please enter product name' }]}
                >
                  <Input placeholder="Xiaomi Watch 2 Pro" />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{message: 'Please enter description' }]}
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
                          label="Base Price $"
                          name="price"
                          rules={[{message: 'Please enter base price' }]}
                        >
                          <InputNumber
                            min={0}
                            formatter={(value) => `${value}`}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item label="Discount (%)" name="discount">
                          <InputNumber min={0} max={100} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="Quantity">
                    <Row gutter={[16, 16]}>
                      <Col xs={24}>
                        <Form.Item 
                          label="Quantity" 
                          name="quantityStock"
                          rules={[{message: 'Please enter quantity' }]}
                        >
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
                <Form.Item 
                  label="Product Images"
                  extra="Upload up to 5 product images"
                >
                  <Upload
                    listType="picture-card"
                    customRequest={handleUpload}
                    fileList={fileList}
                    onChange={handleUploadChange}
                    onRemove={handleRemove}
                    accept="image/*"
                    multiple={false}
                  >
                    {fileList.length >= 5 ? null : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
                
              </Card>
    
              <Card title="Category" style={{ marginTop: 16 }}>
                <Form.Item 
                  label="Product Category" 
                  name="category"
                  rules={[{message: 'Please select a category' }]}
                >
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
              </Card>

              <Card title="Supplier" style={{ marginTop: 16 }}>
                <Form.Item 
                  label="Supplier" 
                  name="supplier"
                  rules={[{message: 'Please select a supplier' }]}
                >
                  <Select placeholder="Select supplier">
                    {suppliers.map((supplier, id) => (
                      <Option id={id} value={supplier.supplierName}>
                        {supplier.supplierName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>

      </div>
    </>
  );
};
export default EditProduct;