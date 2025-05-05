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
  const { orders, loading, error, totalPages} = useAllOrder(
    isLoggedIn && user
      ? { currentPage, pageSize }
      : { skip: true }
  );
  if (!isLoggedIn || !user) {
    navigate('/login');
  }

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


  return (
    <div className="customer-profile-container">
      <Header userInfo={userInfo} />

      <TabInfo 
        userInfo={userInfo} 
        orderHistory={orders} 
        currentPage={currentPage}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage} />

    </div>
  );
};

export default Account;