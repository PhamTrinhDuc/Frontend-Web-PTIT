import React from 'react';
import { List, Avatar, Rate, Image, Typography, Space, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './style.scss';

const { Text, Paragraph, Title } = Typography;

const ReviewList = ({ reviews, loading, pagination, onPageChange }) => {
  return (
    <div className="review-list-container">
      <Title level={4}>Product Reviews</Title>
      <List
        loading={loading}
        itemLayout="vertical"
        dataSource={reviews}
        pagination={
          reviews.length > 0 ? {
            onChange: onPageChange,
            current: pagination.currentPage + 1,
            pageSize: 5,
            total: pagination.totalPages * 5,
            align: 'center',
          } : false
        }
        renderItem={(item) => (
          <List.Item
            key={item.id}
            className="review-item"
          >
            <div className="review-header">
              <Avatar src={item.userAvatar} icon={<UserOutlined />} />
              <div className="user-info">
                <Text strong className="user-name">{item.fullname || item.username}</Text>
                <div className="review-meta">
                  <Rate disabled value={item.rating} size="small" style={{ fontSize: 12 }} />
                  <Divider type="vertical" />
                  <Text type="secondary" className="date">
                    {dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}
                  </Text>
                </div>
              </div>
            </div>
            
            <Paragraph className="review-comment">
              {item.comment}
            </Paragraph>
            
            {item.imageUrls && item.imageUrls.length > 0 && (
              <div className="review-images">
                <Image.PreviewGroup>
                  <Space size={8} wrap>
                    {item.imageUrls.map((url, index) => (
                      <Image
                        key={index}
                        width={100}
                        height={100}
                        src={url}
                        className="review-img"
                        placeholder
                      />
                    ))}
                  </Space>
                </Image.PreviewGroup>
              </div>
            )}
          </List.Item>
        )}
      />
    </div>
  );
};

export default ReviewList;
