import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Row, Col, Empty, Button } from 'antd';
import { fetchWishlist } from '../../../slices/wishlistSlice';
import CardProduct from '../../../components/CardProduct';
import { useNavigate } from 'react-router-dom';
import './Wishlist.scss';

const { Title } = Typography;

const Wishlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading } = useSelector((state) => state.wishlist);
    const { user, isLoggedIn } = useSelector((state) => state.auth);

    console.log("[WishlistPage] Render items:", items);

    useEffect(() => {
        if (isLoggedIn && user) {
            dispatch(fetchWishlist(user.id));
        }
    }, [dispatch, isLoggedIn, user]);

    if (!isLoggedIn) {
        return (
            <div className="wishlist-page container">
                <Empty
                    description="Vui lòng đăng nhập để xem danh sách yêu thích"
                    className="wishlist-empty"
                >
                    <Button type="primary" onClick={() => navigate('/login')}>Đăng nhập</Button>
                </Empty>
            </div>
        );
    }

    return (
        <div className="wishlist-page container">
            <div className="wishlist-header">
                <Title level={2}>Danh sách yêu thích ({items.length})</Title>
            </div>
            {items.length === 0 ? (
                <Empty description="Chưa có sản phẩm nào trong danh sách yêu thích" className="wishlist-empty">
                    <Button type="primary" onClick={() => navigate('/products')}>Tiếp tục mua sắm</Button>
                </Empty>
            ) : (
                <Row gutter={[16, 24]} className="wishlist-grid">
                    {items.map((item) => {
                        // Map back to card product structure
                        const product = {
                           id: item.productId,
                           name: item.productName || 'Unknown Product',
                           price: item.productPrice || 0,
                           discount: 0, 
                           imagePaths: item.productThumbnail ? [item.productThumbnail] : []
                        };
                        return (
                            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                                <CardProduct product={product} />
                            </Col>
                        );
                    })}
                </Row>
            )}
        </div>
    );
};

export default Wishlist;
