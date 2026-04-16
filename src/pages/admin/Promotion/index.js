import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, message, Space, Tag, Popconfirm, Switch, Select, Badge } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { get, post, put, remove } from '../../../utils/requests';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const { Option } = Select;

function Promotion() {
  const { token } = useSelector((state) => state.auth);
  const [flashSales, setFlashSales] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [form] = Form.useForm();

  const fetchFlashSales = async () => {
    setLoading(true);
    try {
      const response = await get('flashsales', token);
      if (response) {
        setFlashSales(response);
      }
    } catch (error) {
      console.error('Failed to fetch flash sales:', error);
      setFlashSales([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await get('products?page=0&size=100', token);
      if (response && response.data && response.data.content) {
        setAllProducts(response.data.content);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchFlashSales();
    fetchAllProducts();
  }, []);

  const handleOpenCreate = () => {
    setEditingSale(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOpenEdit = (record) => {
    setEditingSale(record);
    form.setFieldsValue({
      ...record,
      dateRange: [dayjs(record.startDate), dayjs(record.endDate)],
      productIds: record.products ? record.products.map(p => p.id) : []
    });
    setIsModalVisible(true);
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        startDate: values.dateRange[0].toISOString(),
        endDate: values.dateRange[1].toISOString(),
        status: editingSale ? editingSale.status : 'active'
      };
      delete payload.dateRange;

      if (editingSale) {
        await put(`flashsales/${editingSale.id}`, payload, token);
        message.success('Flash Sale updated successfully!');
      } else {
        await post('flashsales', payload, token);
        message.success('Flash Sale created successfully!');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchFlashSales();
    } catch (error) {
      console.error('Failed to save flash sale:', error);
      message.error(editingSale ? 'Failed to update flash sale' : 'Failed to create flash sale');
    }
  };

  const handleDelete = async (id) => {
    try {
      await remove(`flashsales/${id}`, token);
      message.success('Flash Sale deleted successfully!');
      fetchFlashSales();
    } catch (error) {
      console.error('Failed to delete flash sale:', error);
      message.error('Failed to delete flash sale');
    }
  };

  const handleToggleStatus = async (record, checked) => {
    try {
      const status = checked ? 'active' : 'inactive';
      await put(`flashsales/${record.id}`, {
        ...record,
        productIds: record.products ? record.products.map(p => p.id) : [],
        status: status
      }, token);
      message.success(`Flash Sale is now ${status}`);
      fetchFlashSales();
    } catch (error) {
      console.error('Failed to update status:', error);
      message.error('Failed to update status');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Products',
      key: 'productsCount',
      render: (_, record) => (
        <Badge count={record.products ? record.products.length : 0} color="#108ee9" />
      )
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Space>
          <Switch 
            checked={status === 'active'} 
            onChange={(checked) => handleToggleStatus(record, checked)} 
          />
          <Tag color={status === 'active' ? 'green' : 'red'}>
            {status.toUpperCase()}
          </Tag>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleOpenEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this flash sale?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="admin-promotion-page" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1>Manage Flash Sales</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleOpenCreate}
          size="large"
        >
          Create Flash Sale
        </Button>
      </div>

      <Table 
        dataSource={flashSales} 
        columns={columns} 
        rowKey="id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingSale ? "Edit Flash Sale" : "Create New Flash Sale"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        width={700}
      >
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={handleSubmit}
          style={{ marginTop: '16px' }}
        >
          <Form.Item
            name="title"
            label="Sale Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input placeholder="e.g., Black Friday Madness" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Internal Description"
          >
            <Input.TextArea rows={2} placeholder="Notes about this promotion..." />
          </Form.Item>
          <Form.Item
            name="dateRange"
            label="Active Period"
            rules={[{ required: true, message: 'Please select the date range!' }]}
          >
            <DatePicker.RangePicker 
              showTime={{ format: 'HH:mm' }} 
              format="YYYY-MM-DD HH:mm" 
              style={{ width: '100%' }} 
            />
          </Form.Item>
          <Form.Item
            name="productIds"
            label="Select Products for Flash Sale"
            rules={[{ required: true, message: 'Please select at least one product!' }]}
          >
            <Select
              mode="multiple"
              placeholder="Select products"
              style={{ width: '100%' }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {allProducts.map(product => (
                <Option key={product.id} value={product.id}>
                  {product.name} - ${product.price}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Promotion;