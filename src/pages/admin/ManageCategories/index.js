import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, FilterOutlined, ExportOutlined } from '@ant-design/icons';
import HeaderMangeProduct from '../../../components/admin/HeaderManageProduct';
import { useCategories } from '../../../hook/useCategories';
import Loading from '../../../components/Loading';
import './ManageCategories.scss';


const ManageCategories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  const { categoriesList, loading, error } = useCategories();
  const navigate = useNavigate();
  console.log(categoriesList);
  const [categories, setCategories] = useState([categoriesList]);

  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate("/error");
    return null;
  }

  // Hiển thị modal để thêm hoặc chỉnh sửa danh mục
  const showModal = (category = null) => {
    setEditingCategory(category);
    if (category) {
      form.setFieldsValue(category);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Xử lý khi submit form
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingCategory) {
        // Cập nhật danh mục
        setCategories(
          categories.map((item) =>
            item.key === editingCategory.key ? { ...item, ...values } : item
          )
        );
        message.success('Category updated successfully!');
      } else {
        // Thêm danh mục mới
        const newCategory = {
          key: (categories.length + 1).toString(),
          ...values,
          createdAt: new Date().toLocaleString(),
        };
        setCategories([...categories, newCategory]);
        message.success('Category added successfully!');
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  // Xử lý xóa danh mục
  const handleDelete = (key) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this category?',
      onOk: () => {
        setCategories(categories.filter((item) => item.key !== key));
        message.success('Category deleted successfully!');
      },
    });
  };

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.key)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <HeaderMangeProduct />

      <Table
        dataSource={categories}
        columns={columns}
        pagination={false}
        rowSelection={{ type: 'checkbox' }}
      />

      {/* Modal để thêm hoặc chỉnh sửa danh mục */}
      <Modal
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="categoryName"
            label="Category Name"
            rules={[{ required: true, message: 'Please enter the category name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCategories;