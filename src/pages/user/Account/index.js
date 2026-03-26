import {TabInfo, Header} from '../../../components/Account';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAllOrderByUserId from '../../../hook/useAllOrderByUserId';
import { numPageProductHeader } from '../../../utils/variable';
import React, {useState} from 'react';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = numPageProductHeader;
  console.log("user", user);
  // Truyền currentPage và pageSize vào useAllOrder
  const { orders, loading, error, totalPages} = useAllOrderByUserId(
    isLoggedIn && user
      ? { currentPage, pageSize }
      : { skip: true }
  );

  React.useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate('/login');
    }
  }, [isLoggedIn, user, navigate]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const userInfo = {
    fullName: user.fullname || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
    address: user.address || '',
    avatar: user.avatar || 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
    memberSince: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '',
    orders: orders.length || 0,
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