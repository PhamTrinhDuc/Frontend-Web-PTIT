import React, { useState } from 'react';
import { Form, Input, Rate, Button, Upload, Modal, message, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './style.scss';

const { TextArea } = Input;

const ReviewForm = ({ productId, userId, token, onSubmit, loading, onCancel }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const onFinish = async (values) => {
    // Collect image URLs from uploaded files
    const imageUrls = fileList
      .filter(file => file.status === 'done')
      .map(file => file.response?.data || file.url);

    const reviewData = {
      productId,
      rating: values.rating,
      comment: values.comment,
      imageUrls,
    };

    onSubmit(reviewData);
  };

  return (
    <div className="review-form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ rating: 5 }}
      >
        <Form.Item
          name="rating"
          label="Rating"
          rules={[{ required: true, message: 'Please provide a rating' }]}
        >
          <Rate style={{ fontSize: 24 }} />
        </Form.Item>

        <Form.Item
          name="comment"
          label="Your review"
          rules={[{ required: true, message: 'Please write your feedback' }]}
        >
          <TextArea 
            rows={4} 
            placeholder="How was the product? Share your experience with others." 
          />
        </Form.Item>

        <Form.Item label="Attach Photos">
          <Upload
            action="http://localhost:8080/api/upload/image"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            name="file" // Backend expects 'file' param
            multiple
            maxCount={5}
          >
            {fileList.length >= 5 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Space className="form-actions">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading} className="submit-btn pink-btn">
            Submit Review
          </Button>
        </Space>
      </Form>

      <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default ReviewForm;
