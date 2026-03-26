import React from 'react';
import { Row, Col, Progress, Rate, Typography } from 'antd';
import './style.scss';

const { Title, Text } = Typography;

const ReviewSummary = ({ averageRating, totalReviews, ratingCounts }) => {
  return (
    <div className="review-summary">
      <Row gutter={[32, 32]} align="middle">
        <Col xs={24} md={8} className="average-section">
          <div className="rating-score">
            <span className="score">{averageRating.toFixed(1)}</span>
            <span className="out-of">/ 5</span>
          </div>
          <Rate disabled allowHalf value={averageRating} />
          <div className="total-reviews">{totalReviews} reviews</div>
        </Col>
        
        <Col xs={24} md={16} className="rating-bars">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingCounts ? ratingCounts[star] || 0 : 0;
            const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <Row key={star} align="middle" gutter={8} className="rating-bar-row">
                <Col span={4}>
                  <Text>{star} star</Text>
                </Col>
                <Col span={16}>
                  <Progress 
                    percent={percent} 
                    showInfo={false} 
                    strokeColor="#fadb14" 
                    trailColor="#f5f5f5"
                  />
                </Col>
                <Col span={4}>
                  <Text type="secondary">{count}</Text>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default ReviewSummary;
