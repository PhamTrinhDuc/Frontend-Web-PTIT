import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Tabs, message } from 'antd';
import { get, post, put, remove } from '../../../utils/requests';
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
      const suppliersData = response.data.map((supplier) => ({
        id: supplier.id,
        name: supplier.supplierName,
        contactInfo: supplier.contactInfo,
        active: supplier.active,
      }));
      setSuppliers(suppliersData);
    } catch (error) {
      message.error('Failed to fetch suppliers');
    }
  };

  // Modal handling
  const showModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      form.setFieldsValue(
        type === 'category'
          ? { id: item.id, name: item.name, slug: item.slug }
          : { id: item.id, name: item.name, contactInfo: item.contactInfo, activate: item.active ? 'Activate' : 'InActivate' }
      );
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

      let data = null;
      if (modalType === 'category') {
        data = { ...values };
      } else {
        data = { contactInfo: values.contactInfo, supplierName: values.name };
      }
      if (method === 'put') {
        const response = await put(url, {
          ...data,
        });
      }
      else {
        const response = await post(url, {
          ...data,
        });
      }

      message.success(`${modalType} ${editingItem ? 'updated' : 'added'} successfully`);
      modalType === 'category' ? fetchCategories() : fetchSuppliers();
      setIsModalVisible(false);
    } catch (error) {
      message.error(`Failed to ${editingItem ? 'update' : 'add'} ${modalType}`);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      const response = await remove(`${type}/${id}`);
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
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Contact', dataIndex: 'contactInfo', key: 'contactInfo' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showModal('suppliers', record)}>Edit</Button>
          <Button danger onClick={() => handleDelete('suppliers', record.id)} style={{ marginLeft: 8 }}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="manage-container">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Categories" key="1" style={{ fontSize: '20px', fontWeight: 'bold' }}>
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
            }}
          />
        </TabPane>

        <TabPane tab="Suppliers" key="2" style={{ fontSize: '20px', fontWeight: 'bold' }}>
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
            }}
          />
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
          >
            <Input />
          </Form.Item>
          {modalType === 'category' ? (
            <Form.Item
              name="slug"
              label="Slug"
            >
              <Input />
            </Form.Item>
          ) : (
            <Form.Item
              name="contactInfo"
              label="Contact"
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