import {TabInfo, Header} from '../../../components/Account';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAllOrder from '../../../hook/useAllOrder';
import { numPageProductHeader } from '../../../utils/variable';
import React, {useState} from 'react';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = numPageProductHeader;
  // Truyền currentPage và pageSize vào useAllOrder
  const { orders, loading, error } = useAllOrder(
    isLoggedIn && user
      ? { id: user.id, currentPage, pageSize }
      : { skip: true }
  );
  if (!isLoggedIn || !user) {
    navigate('/login');
  }

  const orderHistory = orders.flatMap((order) =>
    order.items.map((item) => ({
      date: order.orderDate,
      product: item.productName,
      price: item.unitPrice * item.quantity,
      quantity: item.quantity,
      status: order.status,
      paymentMethod: order.paymentMethod,
    }))
  );
  const userInfo = {
    fullName: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address,
    avatar: user.avatar,
    memberSince: user.createdAt,
    orders: orders.length,
    points: 1500,
  };

  const vouchers = [
    { id: 1, name: 'Giảm 10% đơn từ 500k', expiry: '2025-04-01' },
    { id: 2, name: 'Freeship đơn từ 200k', expiry: '2025-03-20' },
  ];

  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Túi xách thời trang', price: 800000, image: 'https://www.gento.vn/wp-content/uploads/2023/05/tui-xach-nu-6-600x600.jpg' },
    { id: 2, name: 'Đồng hồ nam', price: 1200000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiNo-UKrl5psCtsf7xs3MQTB110xUjJ6hWPA&s' },
  ]);


  return (
    <div className="customer-profile-container">
      <Header userInfo={userInfo} />

      <TabInfo 
        userInfo={userInfo} 
        orderHistory={orderHistory} 
        vouchers={vouchers} 
        wishlist={wishlist}
        currentPage={currentPage}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage} />

    </div>
  );
};

export default Account;