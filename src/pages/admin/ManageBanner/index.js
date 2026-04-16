import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Space, Popconfirm, Upload } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { get, post, put, remove } from '../../../utils/requests';
import { useSelector } from 'react-redux';

function ManageBanner() {
  const { token } = useSelector((state) => state.auth);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const response = await get('banners', token);
      if (response) {
        setBanners(response);
      }
    } catch (error) {
      console.error('Failed to fetch banners:', error);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleOpenCreate = () => {
    setEditingBanner(null);
    setImageUrl('');
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOpenEdit = (record) => {
    setEditingBanner(record);
    setImageUrl(record.image);
    form.setFieldsValue({
      ...record,
    });
    setIsModalVisible(true);
  };

  const handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }
    if (info.file.status === 'done') {
      setUploading(false);
      const url = info.file.response.data;
      setImageUrl(url);
      form.setFieldsValue({ image: url });
      message.success('Image uploaded successfully');
    } else if (info.file.status === 'error') {
      setUploading(false);
      message.error(info.file.response?.message || 'Image upload failed');
    }
  };

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleSubmit = async (values) => {
    try {
      if (editingBanner) {
        await put(`banners/${editingBanner.id}`, values, token);
        message.success('Banner updated successfully!');
      } else {
        await post('banners', values, token);
        message.success('Banner created successfully!');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchBanners();
    } catch (error) {
      console.error('Failed to save banner:', error);
      message.error(editingBanner ? 'Failed to update banner' : 'Failed to create banner');
    }
  };

  const handleDelete = async (id) => {
    try {
      await remove(`banners/${id}`, token);
      message.success('Banner deleted successfully!');
      fetchBanners();
    } catch (error) {
      console.error('Failed to delete banner:', error);
      message.error('Failed to delete banner');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => (
        <img src={text} alt="banner" style={{ width: 100, height: 'auto', borderRadius: 4 }} />
      )
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Discount Info',
      dataIndex: 'discount',
      key: 'discount',
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
            title="Are you sure you want to delete this banner?"
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
    <div className="admin-banner-page" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1>Manage Banners</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenCreate}
          size="large"
        >
          Create Banner
        </Button>
      </div>

      <Table
        dataSource={banners}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingBanner ? "Edit Banner" : "Create New Banner"}
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
            label="Banner Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input placeholder="e.g., iPhone 14 Series" />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Discount Text"
            rules={[{ required: true, message: 'Please input the discount text!' }]}
          >
            <Input placeholder="e.g., Up to 10% off Voucher" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Banner Image"
            rules={[{ required: true, message: 'Please upload an image!' }]}
          >
            <div>
              <Input style={{ display: 'none' }} />
              <Upload
                name="file"
                listType="picture-card"
                className="banner-uploader"
                showUploadList={false}
                action="http://localhost:8080/api/upload/image"
                onChange={handleUploadChange}
                accept="image/*"
              >
                {imageUrl ? <img src={imageUrl} alt="banner" style={{ width: '100%', maxHeight: '150px', objectFit: 'contain' }} /> : uploadButton}
              </Upload>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageBanner;
