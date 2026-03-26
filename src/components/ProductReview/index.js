import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Result, message, Spin, Tabs, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsByProductId, fetchReviewSummary, submitReview, clearReviewError } from '../../slices/reviewSlice';
import ReviewList from './ReviewList';
import ReviewSummary from './ReviewSummary';
import ReviewForm from './ReviewForm';
import { get } from '../../utils/requests';
import './style.scss';

const ProductReview = ({ productId }) => {
  const dispatch = useDispatch();
  const { items, summary, loading, submitting, pagination, error } = useSelector((state) => state.reviews);
  const { isLoggedIn, user, token } = useSelector((state) => state.auth);
  const [canReview, setCanReview] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchReviewsByProductId({ productId, page: 0 }));
    dispatch(fetchReviewSummary(productId));
    
    if (isLoggedIn && user) {
      checkCanReview();
    }
  }, [productId, isLoggedIn, user]);

  const checkCanReview = async () => {
    try {
      const response = await get(`reviews/check?userId=${user.id}&productId=${productId}`, token);
      setCanReview(response?.data?.canReview || false);
    } catch (err) {
      console.error('Check review status failed:', err);
    }
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit = async (reviewData) => {
    try {
      const result = await dispatch(submitReview({ reviewData, userId: user.id })).unwrap();
      if (result) {
        message.success('Review submitted successfully!');
        setIsModalOpen(false);
        // Refresh 
        dispatch(fetchReviewsByProductId({ productId, page: 0 }));
        dispatch(fetchReviewSummary(productId));
        checkCanReview();
      }
    } catch (err) {
      message.error(err || 'Failed to submit review');
    }
  };

  const handlePageChange = (page) => {
    dispatch(fetchReviewsByProductId({ productId, page: page - 1 }));
  };

  return (
    <div className="product-review-section">
      <Card title="REVIEWS & RATINGS" className="review-card-wrapper pink-header">
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <ReviewSummary 
              averageRating={summary.averageRating} 
              totalReviews={summary.totalReviews} 
              // ratingCounts could be added later if backend supports it
            />
          </Col>
          
          <Col span={24} style={{ textAlign: 'center' }}>
            {canReview ? (
              <Button type="primary" onClick={showModal} className="pink-btn" size="large">
                Write a Review
              </Button>
            ) : isLoggedIn ? (
              <p className="review-info-text grey-text italic">Only customers who have purchased this product can review.</p>
            ) : (
              <p className="review-info-text grey-text italic">Please log in to review the product.</p>
            )}
          </Col>

          <Col span={24}>
            <ReviewList 
              reviews={items} 
              loading={loading} 
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </Col>
        </Row>
      </Card>

      <Modal
        title="Write your review"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
        destroyOnClose
      >
        <ReviewForm
          productId={productId}
          userId={user?.id}
          token={token}
          onSubmit={handleSubmit}
          loading={submitting}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default ProductReview;
