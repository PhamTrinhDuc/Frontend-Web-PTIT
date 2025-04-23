import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Tabs, message } from 'antd';
import { get, post, del } from '../../../utils/requests';
import { numPageProduct } from '../../../utils/variable';
import axios from 'axios';
import './ManageCategoriesSuppliers.scss';

const { TabPane } = Tabs;

const ManageCategoriesSuppliers = () => {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('category'); // 'category' or 'supplier'
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  // Fetch data
  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await get('category');
      setCategories(response.data);
    } catch (error) {
      message.error('Failed to fetch categories');
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await get('suppliers');
      setSuppliers(response);
    } catch (error) {
      message.error('Failed to fetch suppliers');
    }
  };

  // Modal handling
  const showModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      form.setFieldsValue(item);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const url = editingItem
        ? `${modalType}/${editingItem.id}`
        : `${modalType}`;
      const method = editingItem ? 'put' : 'post';

      await axios[method](url, values);
      message.success(`${modalType} ${editingItem ? 'updated' : 'added'} successfully`);
      modalType === 'category' ? fetchCategories() : fetchSuppliers();
      setIsModalVisible(false);

    } catch (error) {
      message.error(`Failed to ${editingItem ? 'update' : 'add'} ${modalType}`);
    }
  };  

  const handleDelete = async (type, id) => {
    try {
      await axios.delete(`${type}s/${id}`);
      message.success(`${type} deleted successfully`);
      type === 'category' ? fetchCategories() : fetchSuppliers();
    } catch (error) {
      message.error(`Failed to delete ${type}`);
    }
  };

  // Table columns
  const categoryColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Slug', dataIndex: 'slug', key: 'slug' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showModal('category', record)}>Edit</Button>
          <Button danger onClick={() => handleDelete('category', record.id)} style={{ marginLeft: 8 }}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const supplierColumns = [
    { title: 'Name', dataIndex: 'supplierName', key: 'supplierName' },
    { title: 'Contact', dataIndex: 'contactInfo', key: 'contactInfo' },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (active) => (active ? 'Activate' : 'InActivate'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showModal('supplier', record)}>Edit</Button>
          <Button danger onClick={() => handleDelete('supplier', record.id)} style={{ marginLeft: 8 }}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="manage-container">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Categories" key="1" style={{fontSize: '20px', fontWeight: 'bold'}}>
          <Button
            type="primary"
            onClick={() => showModal('category')}
            style={{ marginBottom: 16 }}
          >
            Add Category
          </Button>
          <Table 
            columns={categoryColumns} 
            dataSource={categories} 
            rowKey="id"
            pagination={{
              pageSize: numPageProduct,
              style: { alignItems: 'center', justifyContent: 'center' },
            }}/>
        </TabPane>
        <TabPane tab="Suppliers" key="2" style={{fontSize: '20px', fontWeight: 'bold'}}>
          <Button
            type="primary"
            onClick={() => showModal('suppliers')}
            style={{ marginBottom: 16 }}
          >
            Add Supplier
          </Button>
          <Table 
          columns={supplierColumns} 
          dataSource={suppliers} 
          rowKey="id" 
          pagination={{
            pageSize: numPageProduct,
            style: { alignItems: 'center', justifyContent: 'center' },
          }}/>
        </TabPane>
      </Tabs>

      <Modal
        title={`${editingItem ? 'Edit' : 'Add'} ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            // rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="activate"
            label="Activate"
            // rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>

          {modalType === 'category' ? (
            <Form.Item
              name="slug"
              label="Slug"
              // rules={[{ required: true, message: 'Please input the slug!' }]}
            >
              <Input />
            </Form.Item>
          ) : (
            <Form.Item
              name="contact"
              label="Contact"
              // rules={[{ required: true, message: 'Please input the contact!' }]}
            >
              <Input />
            </Form.Item>
            
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCategoriesSuppliers;