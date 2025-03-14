
import {TabInfo, Header} from '../../../components/Account';

import React, {useState} from 'react';

const Account = () => {
  const userInfo = {
    fullName: 'Trần Thị B',
    email: 'tranthib@gmail.com',
    phone: '0987 654 321',
    address: '456 Nguyễn Trãi, TP.HCM',
    avatar: 'https://i.pravatar.cc/300',
    memberSince: '2023-01-15',
    orders: 25,
    points: 1500,
  };

  const orderHistory = [
    { id: 1, date: '2025-03-10', product: 'Áo thun nam', price: 150000, status: 'Delivered' },
    { id: 2, date: '2025-02-25', product: 'Quần jeans nữ', price: 350000, status: 'Shipped' },
    { id: 3, date: '2025-01-30', product: 'Giày thể thao', price: 500000, status: 'Delivered' },
  ];

  const vouchers = [
    { id: 1, name: 'Giảm 10% đơn từ 500k', expiry: '2025-04-01' },
    { id: 2, name: 'Freeship đơn từ 200k', expiry: '2025-03-20' },
  ];

  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Túi xách thời trang', price: 800000, image: 'https://www.gento.vn/wp-content/uploads/2023/05/tui-xach-nu-6-600x600.jpg' },
    { id: 2, name: 'Đồng hồ nam', price: 1200000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiNo-UKrl5psCtsf7xs3MQTB110xUjJ6hWPA&s' },
  ]);

  const handleLogout = () => {
    console.log('Đăng xuất');
  };

  const handleDeleteItem = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="customer-profile-container">
      <Header userInfo={userInfo} />

      <TabInfo userInfo={userInfo} orderHistory={orderHistory} vouchers={vouchers} wishlist={wishlist} handleLogout={handleLogout} handleDeleteItem={handleDeleteItem} />

    </div>
  );
};

export default Account;