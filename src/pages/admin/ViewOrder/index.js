import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardOrder from '../../../components/admin/CardOrder';
import useAllOrder from '../../../hook/useAllOrder';
import Loading from '../../../components/Loading';
import HeaderManageOrder from '../../../components/admin/HeaderManageOrder';
import './ViewOrder.scss';


function ViewOrder() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [allOrders, setOrders] = useState([]);

  const { orders, loading, error } = useAllOrder(
    isLoggedIn && user ? { id: user.id } : { skip: true }
  );

  React.useEffect(() => {
    if (orders) {
      setOrders(orders);
    }
  }, [orders]);

  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate('/error');
    return null;
  }

  // Hàm lọc đơn hàng theo trạng thái
  const filterOrdersByStatus = (status) => {
    const filteredOrders = orders.filter((order) => order.status === status.toUpperCase());
    console.log('filteredOrders', filteredOrders);
    setOrders(filteredOrders);
  };

  return (
    <>
      <HeaderManageOrder orders={orders} onFilterByStatus={filterOrdersByStatus}/>
      <CardOrder orders={allOrders}/>
    </>
  );
}

export default ViewOrder;